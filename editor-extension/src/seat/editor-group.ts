/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * Which editor group a seat's transcript belongs in.
 *
 * The decision only, with no `vscode` import: everything it needs is a number or
 * a list of numbers, so it can be exercised without an extension host. Reading
 * the terminals, the tab groups and the remembered store is the caller's, in
 * `../features/seat-tree/columns.ts`.
 *
 * A `ViewColumn` is an enum over the positive integers in the editor area, so a
 * plain number carries it exactly. The negative members (`Active`, `Beside`) are
 * relative positions rather than groups and never appear here — a tab group
 * always reports a concrete column.
 */

/** A concrete editor group, as `vscode.ViewColumn` numbers it. */
export type ColumnNumber = number;

/** `vscode.ViewColumn.One`, spelled without importing the enum. */
export const FIRST_COLUMN: ColumnNumber = 1;

export interface ColumnChoice {
	readonly column: ColumnNumber;
	/** Which of the three rules answered, for the log and for the tests. */
	readonly reason: 'remembered' | 'ancestor' | 'first';
}

/**
 * Where a seat with no terminal in this window opens.
 *
 * THREE RULES IN PRIORITY ORDER, and the order is what keeps Alan's two
 * placement rules from colliding.
 *
 * `remembered` is the group this seat's own session was last seen working in. It
 * wins because it is the most specific thing known, and it can only be set for a
 * seat that once had a terminal here — which is to say an interactive one. So a
 * headless seat never reaches it, and Alan's rule for a stopped interactive seat
 * and his rule for a headless one apply to disjoint populations rather than
 * competing.
 *
 * `ancestorColumn` is the group holding the terminal of the nearest ancestor that
 * has one here — the interactive ancestor, in every case where one can be named.
 *
 * The first group is the floor. It is where a stopped seat lands when the group
 * it last ran in has since been closed, which is what Alan asked for; the
 * ancestor rule sits above that fallback rather than beside it, because a seat
 * whose remembered group is gone and whose branch is working in a live group is
 * better served by the branch than by column one. A root seat — which is what a
 * stopped interactive agent usually is — has no ancestor here, so it falls to the
 * first group exactly as he specified.
 */
export function chooseColumn(input: {
	readonly remembered: ColumnNumber | undefined;
	readonly ancestorColumn: ColumnNumber | undefined;
	readonly openColumns: readonly ColumnNumber[];
}): ColumnChoice {
	const { remembered, ancestorColumn, openColumns } = input;
	if (remembered !== undefined && openColumns.includes(remembered)) {
		return { column: remembered, reason: 'remembered' };
	}
	if (ancestorColumn !== undefined && openColumns.includes(ancestorColumn)) {
		return { column: ancestorColumn, reason: 'ancestor' };
	}
	return { column: firstColumn(openColumns), reason: 'first' };
}

/**
 * Where a terminal is created, spelled without importing `vscode`.
 *
 * This is `TerminalEditorLocationOptions` structurally. It is redeclared rather
 * than imported because importing it would pull `vscode` into this module, and
 * having no `vscode` import is the whole reason the rule above can be exercised
 * without an extension host. The caller passes the result straight to
 * `createTerminal`, where the compiler checks the two shapes against each other.
 */
export interface EditorLocation {
	readonly viewColumn: ColumnNumber;
}

/**
 * The options a seat's terminal is created with.
 *
 * `location` IS REQUIRED, which is the point of the type. `TerminalOptions.location`
 * is optional, and a terminal created without one goes wherever terminals go by
 * default — the panel Alan keeps closed. That omission is the defect this function
 * exists to make unspellable: there is no way to build this value and leave the
 * group unsaid.
 *
 * It carries the name as well as the location so that one call builds the whole
 * argument. A helper returning only the location would leave `createTerminal` still
 * being handed a hand-assembled object, which is the shape the omission hid in.
 */
export interface SeatTerminalOptions {
	readonly name: string;
	readonly location: EditorLocation;
}

/** A seat's terminal, named for the seat and placed in a chosen group. */
export function seatTerminalOptions(name: string, column: ColumnNumber): SeatTerminalOptions {
	return { name, location: { viewColumn: column } };
}

/**
 * The leftmost open group, or column one where nothing is open.
 *
 * The lowest number rather than the first element: `TabGroups.all` is not
 * documented to be ordered by column, and "the first group" is a position on
 * screen.
 */
export function firstColumn(openColumns: readonly ColumnNumber[]): ColumnNumber {
	let lowest: ColumnNumber | undefined;
	for (const column of openColumns) {
		if (lowest === undefined || column < lowest) { lowest = column; }
	}
	return lowest ?? FIRST_COLUMN;
}
