/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * Reading a seat's place off its row, and finding a row on an assembled tree.
 *
 * SPLIT FROM `forest.ts` FOR SIZE ALONE, and re-exported from there so every
 * caller keeps the import it had: these are pure functions of their arguments,
 * and the assembly file was past the ceiling one file may weigh.
 */
import { SEAT_MODE_SCHEMA, type SeatMode } from '../../seat/mode.ts';
import type { AgentNode } from './forest.ts';
import type { HarnessRow } from './harness.ts';

/**
 * Where each seat runs, read off the row.
 *
 * THE SEAT'S OWN PAGE IS THE AUTHORITY. Its `start-mode` key is what the harness
 * answers as `mode`, and both launch paths write that key on the way up, so a seat
 * that has ever been placed states where it runs.
 *
 * A SEAT WHOSE PAGE STATES NO MODE IS TAKEN AS INTERACTIVE, because that is the
 * guess whose failure Alan can see. Interactive brings a seat back into a terminal
 * in this editor, where a wrong reading is in front of him and one toggle away;
 * headless brings it back as a detached supervisor with no window, so a wrong
 * reading leaves the seat working out of sight. The row's `launch` is not consulted
 * here — it restates the principal and says nothing about where a seat runs.
 *
 * A MODE OUTSIDE THE TWO WORDS IS ANSWERED AS NONE rather than trusted through a
 * cast. This value reaches the run toggle, which sends the seat to one of two
 * entirely different places.
 */
export function readSeatPlaces(rows: readonly HarnessRow[]): ReadonlyMap<string, SeatMode> {
	const places = new Map<string, SeatMode>();
	for (const row of rows) {
		const stated = SEAT_MODE_SCHEMA.safeParse(row.mode);
		places.set(row.id, stated.success ? stated.data : 'interactive');
	}
	return places;
}

/**
 * The names of a seat's ancestors in this forest, nearest first.
 *
 * NEAREST FIRST IS THE WHOLE POINT. The caller walks this list looking for the
 * first ancestor with a terminal in this window, and a headless seat spawned by
 * another headless seat has to resolve to the interactive one further up rather
 * than to the root — so the order is the search order, not a display order.
 *
 * Names rather than ids, because a terminal resolves to a seat by name: what a
 * terminal answers with is the tmux session attached under it, which is the seat
 * name and carries no row id, so the name is the only join between a running
 * terminal and a row in this tree.
 *
 * A seat not in the forest has no ancestors here, which is the same answer as a
 * root: nothing to walk. A subagent row carries no command, so no subagent ever
 * reaches this — but one that did would walk its seats like any other node.
 */
/**
 * Every SEAT on the tree, by name.
 *
 * Names rather than ids, for the reason `ancestorNames` answers names: a terminal
 * resolves to a seat by name and carries no row id, so the name is the only join between
 * something running in this window and a row on this tree.
 *
 * A SUBAGENT IS NOT HERE. A subagent is not a seat — `ops seat stop` does not address one
 * and there is no session to resume it on — and it runs inside its seat's terminal rather
 * than in one of its own, so a lookup that admitted it would answer a subagent for the
 * seat's own terminal.
 *
 * Where two rows carry one name the later walked wins, which is the same row the tree
 * would draw last. Seat names are unique across the live fleet, so this decides nothing
 * in practice and is stated so that it is not read as a guarantee.
 */
export function seatsByName(roots: readonly AgentNode[]): ReadonlyMap<string, AgentNode> {
	const found = new Map<string, AgentNode>();
	const walk = (nodes: readonly AgentNode[]): undefined => {
		for (const node of nodes) {
			if (node.kind === 'seat') { found.set(node.name, node); }
			walk(node.children);
		}
		return undefined;
	};
	walk(roots);
	return found;
}

export function ancestorNames(roots: readonly AgentNode[], id: string): readonly string[] {
	const found: string[] = [];
	const walk = (node: AgentNode, trail: readonly string[]): boolean => {
		if (node.id === id) {
			found.push(...trail);
			return true;
		}
		const below = [node.name, ...trail];
		for (const child of node.children) {
			if (walk(child, below)) { return true; }
		}
		return false;
	};
	for (const root of roots) {
		if (walk(root, [])) { break; }
	}
	return found;
}
