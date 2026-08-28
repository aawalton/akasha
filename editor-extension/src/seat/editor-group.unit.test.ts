import { describe, expect, test } from 'bun:test';
import { chooseColumn, firstColumn, seatTerminalOptions } from './editor-group.ts';

const THREE_OPEN = [1, 2, 3];

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

	test('falls to the first group when the remembered one has been closed', () => {
		expect(
			chooseColumn({ remembered: 4, ancestorColumn: undefined, openColumns: THREE_OPEN })
		).toEqual({ column: 1, reason: 'first' });
	});

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

describe('seatTerminalOptions', () => {
	test('names the seat and the group together', () => {
		expect(seatTerminalOptions('amy-flex-1', 2)).toEqual({
			name: 'amy-flex-1',
			location: { viewColumn: 2 },
		});
	});

	test('always carries a view column', () => {
		expect(seatTerminalOptions('seat', 1).location.viewColumn).toBe(1);
	});

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
