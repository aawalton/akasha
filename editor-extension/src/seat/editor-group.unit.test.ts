/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { describe, expect, test } from 'bun:test';
import { chooseColumn, firstColumn, seatTerminalOptions } from './editor-group';

// A window with three groups open, which is the shape Alan works in.
const THREE_OPEN = [1, 2, 3];

// These pin Alan's two placement rules and the order between them. Nothing else
// can: the type says only that three numbers go in and one comes out, and every
// wrong priority produces a legal column.
describe('chooseColumn', () => {
	test('takes the group this seat\'s own session last ran in, over its ancestor\'s', () => {
		expect(chooseColumn({ remembered: 2, ancestorColumn: 3, openColumns: THREE_OPEN })).toEqual({
			column: 2,
			reason: 'remembered',
		});
	});

	test('falls to the interactive ancestor\'s group when this seat was never seen here', () => {
		expect(
			chooseColumn({ remembered: undefined, ancestorColumn: 3, openColumns: THREE_OPEN })
		).toEqual({ column: 3, reason: 'ancestor' });
	});

	// Alan's rule for a stopped seat: the group it last ran in, or the first group
	// when that one is gone. A root seat has no ancestor here, so this is the path
	// a stopped interactive agent actually takes.
	test('falls to the first group when the remembered one has been closed', () => {
		expect(
			chooseColumn({ remembered: 4, ancestorColumn: undefined, openColumns: THREE_OPEN })
		).toEqual({ column: 1, reason: 'first' });
	});

	// The one place the two rules could have been read either way. A seat whose
	// remembered group is gone but whose branch is working in a live group goes to
	// the branch, on the ground that Alan's "or the first group" names the floor
	// rather than the next rule down.
	test('prefers a live branch to column one when the remembered group is gone', () => {
		expect(chooseColumn({ remembered: 9, ancestorColumn: 2, openColumns: THREE_OPEN })).toEqual({
			column: 2,
			reason: 'ancestor',
		});
	});

	test('ignores an ancestor group that is no longer open', () => {
		expect(
			chooseColumn({ remembered: undefined, ancestorColumn: 7, openColumns: THREE_OPEN })
		).toEqual({ column: 1, reason: 'first' });
	});
});

describe('firstColumn', () => {
	// The editor area renumbers as groups close, so "the first group" is a
	// position on screen and not the literal 1 nor whatever `TabGroups.all`
	// happens to list first.
	test('is the lowest open column rather than the first element', () => {
		expect(firstColumn([3, 1, 2])).toBe(1);
	});

	test('is the leftmost survivor when column one has been closed', () => {
		expect(firstColumn([3, 2])).toBe(2);
	});

	test('is column one for a window reporting no groups', () => {
		expect(firstColumn([])).toBe(1);
	});
});

// The defect these were written against: a seat brought back interactive was
// created with no location at all, so it opened in the panel Alan keeps closed
// rather than in an editor group. What is pinned here is that a location is
// always carried, and that it is the one the rule above chose.
describe('seatTerminalOptions', () => {
	test('names the seat and the group together', () => {
		expect(seatTerminalOptions('amy-flex-1', 2)).toEqual({
			name: 'amy-flex-1',
			location: { viewColumn: 2 },
		});
	});

	// Placement is the whole of this: options carrying no view column are how the
	// terminal ended up in the panel, and nothing else in the suite would notice
	// the location going missing again.
	test('always carries a view column', () => {
		expect(seatTerminalOptions('seat', 1).location.viewColumn).toBe(1);
	});

	// The two halves joined. Each is covered above on its own, and neither
	// catches the column being chosen correctly and then not reaching the
	// terminal — which is exactly the fault this project fixed.
	test('places the terminal in the column the rule chose', () => {
		const choice = chooseColumn({ remembered: 3, ancestorColumn: 1, openColumns: THREE_OPEN });
		expect(seatTerminalOptions('amy-flex-1', choice.column).location.viewColumn).toBe(3);
	});

	test('places it in the fallback column when nothing is remembered', () => {
		const choice = chooseColumn({
			remembered: undefined,
			ancestorColumn: undefined,
			openColumns: [2, 3],
		});
		expect(seatTerminalOptions('seat', choice.column)).toEqual({
			name: 'seat',
			location: { viewColumn: 2 },
		});
	});
});
