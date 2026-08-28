import { describe, expect, test } from 'bun:test';
import type { StoplightsSlotDef } from './slot-types.ts';
import { SLOTS } from './slots.ts';

function stoplightsSlot(id: string): StoplightsSlotDef {
	const slot = SLOTS.find((s) => s.id === id);
	if (slot === undefined) { throw new Error(`no slot ${id}`); }
	if (slot.kind !== 'stoplights') { throw new Error(`slot ${id} is ${slot.kind}, expected stoplights`); }
	return slot;
}

const UPKEEP_ID = 'opsStatusBar.upkeepStoplights';
const INBOX_ID = 'opsStatusBar.inboxStoplights';
const VALUES_ID = 'opsStatusBar.stoplights';

describe('health-stoplights slot — placement', () => {
	test('renders left of the inboxes', () => {
		const priority = (id: string): number => {
			const slot = SLOTS.find((s) => s.id === id);
			if (slot === undefined) { throw new Error(`no slot ${id}`); }
			return slot.priority;
		};
		expect(priority(UPKEEP_ID)).toBeGreaterThan(priority(INBOX_ID));
		expect(priority(INBOX_ID)).toBeGreaterThan(priority(VALUES_ID));
	});

	test('never places two separators next to each other', () => {
		const adjacent = SLOTS.filter(
			(s, i) => i > 0 && s.kind === 'separator' && SLOTS[i - 1]?.kind === 'separator',
		).map((s) => s.id);
		expect(adjacent).toEqual([]);
	});

	test('carries a separator on each side, matching the existing pair\'s treatment', () => {
		const idx = SLOTS.findIndex((s) => s.id === UPKEEP_ID);
		expect(idx).toBeGreaterThanOrEqual(0);
		expect(SLOTS[idx - 1]?.kind).toBe('separator');
		expect(SLOTS[idx + 1]?.kind).toBe('separator');
		expect(SLOTS[idx + 2]?.id).toBe(INBOX_ID);
	});
});

describe('stoplights slots — each declares the read that feeds it', () => {
	test('the three sections are distinct', () => {
		const sections = [UPKEEP_ID, INBOX_ID, VALUES_ID].map((id) => stoplightsSlot(id).section);
		expect(sections).toEqual(['upkeep', 'inbox', 'daily']);
	});

	test('no stoplights slot carries a label to spell a legend into', () => {
		for (const id of [UPKEEP_ID, INBOX_ID, VALUES_ID]) {
			expect(stoplightsSlot(id)).not.toHaveProperty('label');
		}
	});

	test('a stoplights slot names its group and carries no other key', () => {
		for (const id of [UPKEEP_ID, INBOX_ID, VALUES_ID]) {
			expect(Object.keys(stoplightsSlot(id)).sort()).toEqual([
				'id',
				'kind',
				'priority',
				'section',
			]);
		}
	});
});

describe('the retired command-duration timers', () => {
	test('no slot carries either timer\'s id', () => {
		const ids = SLOTS.map((s) => s.id);
		expect(ids).not.toContain('opsStatusBar.timers.check');
		expect(ids).not.toContain('opsStatusBar.timers.deploy');
	});
});
