import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as favouritesActions from '../actions/favourites_act';

import _ from 'lodash';

import base from '../themes/BaseStyles';
import Fonts from '../themes/Fonts';

import PlayerCard from '../components/PlayerCard';

export const mapStateToProps = state => ({
    alpha: state.settingsState.alpha,
    mod: state.settingsState.mod,
    legend: state.settingsState.legend,
    secondLegend: state.settingsState.secondLegend,
    legendHex: state.settingsState.legendHex,
    legendTranslucent: state.settingsState.legendTranslucent,
    favouritesList: state.favouritesState.favourites,
    tracker: state.navigationState.tracker,
    background: state.settingsState.background
});

export const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(favouritesActions, dispatch)
});

class Favourite extends Component {

    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
    }

    componentDidMount() {
        this.props.tracker.trackScreenView('Favourite');
    }

    renderRow(item) {
        let rowData = item.item
        if (rowData !== undefined) {
            return (
                <PlayerCard info={rowData} />
            );
        } else {
            return <View />
        }
    }

    render() {
        var content;

        if (this.props.favouritesList.length < 1) {
            content = (
                <View style={styles.contentContainer}>
                    <View style={{ backgroundColor: this.props.mod, borderRadius: 5, borderWidth: 1, borderColor: this.props.mod, paddingHorizontal: 10, paddingVertical: 5, marginHorizontal: 20 }}>
                        <Text style={[styles.noDataText, { color: this.props.secondLegend }]}>Looks like you have not added anyone as favourite.
                        Add them from search tab!</Text>
                    </View>
                </View>
            )
        } else {
            content = (
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={this.props.favouritesList}
                        renderItem={this.renderRow}
                        style={styles.listView}
                        enableEmptySections={true}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>

            )
        }
        return (
            <View style={[styles.container, { backgroundColor: this.props.background }]}>
                {content}
            </View>
        )
    }
}

const baseStyles = _.extend(base.general, {
    contentContainer: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 10
    },
    purgeButton: {
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
        paddingTop: 8,
        paddingBottom: 8,
        paddingRight: 10,
        marginTop: 5,
        marginBottom: 5,
        alignItems: 'flex-start',
        justifyContent: 'center',
        flex: 2
    },
    purgeIconContainer: {
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 10,
        paddingRight: 8,
        marginTop: 5,
        marginBottom: 5,
        alignItems: 'flex-end',
        justifyContent: 'center',
        flex: 1
    },
    purgeButtonText: {
        fontFamily: Fonts.base,
        fontSize: 16
    },
    purgeContainer: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        flex: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    }
});

const styles = StyleSheet.create(baseStyles);
export default connect(mapStateToProps, mapDispatchToProps)(Favourite);
