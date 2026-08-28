/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as vscode from 'vscode';
import { type ColumnMemory, type SeatTerminal } from './columns.ts';
import { type AgentNode } from './forest.ts';

/**
 * The tree's live state, held apart from the view so every part of the feature
 * reads one copy. Written only by `activate.ts`, through the setters below.
 */

export let output: vscode.OutputChannel;

/**
 * The forest as the tree last read it, held so a click can walk a seat's
 * ancestors. The click needs the branch above the row it landed on, and a
 * `TreeItem` command carries only what was put in its arguments.
 */
export let forest: readonly AgentNode[] = [];

/** Where each seat's terminal was last seen, so a stopped seat still has a group. */
export let columns: ColumnMemory;

/**
 * The seat terminals the last successful sweep found, held so a tab opening or closing
 * can be answered without paying another `ps` snapshot for it.
 *
 * A SWEEP THAT COULD NOT BE TAKEN LEAVES THIS ALONE, on the same reasoning `sampleColumns`
 * states for the column store: no process table means no seat resolves, and an empty
 * reading must not be able to erase a real one.
 */
export let seatTerminals: readonly SeatTerminal[] = [];

/**
 * The seat behind each claimed tab, by terminal instance id — what a command invoked from
 * a tab menu resolves its argument through.
 *
 * Written by the same pass that publishes the context keys, so what a menu offers and what
 * its command can find are decided together rather than by two readings that could
 * disagree.
 */
export let seatTabs: ReadonlyMap<number, AgentNode> = new Map();

export function setOutput(next: vscode.OutputChannel): undefined {
	output = next;
	return undefined;
}

export function setForest(next: readonly AgentNode[]): undefined {
	forest = next;
	return undefined;
}

export function setColumns(next: ColumnMemory): undefined {
	columns = next;
	return undefined;
}

export function setSeatTerminals(next: readonly SeatTerminal[]): undefined {
	seatTerminals = next;
	return undefined;
}

export function setSeatTabs(next: ReadonlyMap<number, AgentNode>): undefined {
	seatTabs = next;
	return undefined;
}
