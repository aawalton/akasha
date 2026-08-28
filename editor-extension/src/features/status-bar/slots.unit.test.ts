/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { describe, expect, test } from 'bun:test';
import type { StoplightsSlotDef } from './slot-types';
import { SLOTS } from './slots';

function stoplightsSlot(id: string): StoplightsSlotDef {
	const slot = SLOTS.find((s) => s.id === id);
	if (slot === undefined) { throw new Error(`no slot ${id}`); }
	if (slot.kind !== 'stoplights') { throw new Error(`slot ${id} is ${slot.kind}, expected stoplights`); }
	return slot;
}

const UPKEEP_ID = 'opsStatusBar.upkeepStoplights';
const INBOX_ID = 'opsStatusBar.inboxStoplights';
const VALUES_ID = 'opsStatusBar.stoplights';

// `StatusBarAlignment.Right` sorts by DESCENDING priority left-to-right, and
// `SLOTS` stamps priority from array position — so array order IS render order
// and a placement claim is checkable without a running vscode.
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

	// The state circle was dropped from between the steps and the stoplights on
	// 2026-08-12, and its two separators had to collapse to one. Two adjacent
	// separators render as `| |` with nothing between them, which reads as a
	// section that failed to load rather than as one that is not there.
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

// Each stoplights slot is fed by its own read, and the slot NAMES that read.
// Rendering is otherwise identical across the three, so a slot pointing at a
// neighbour's read shows the wrong group's colours with nothing to betray it.
describe('stoplights slots — each declares the read that feeds it', () => {
	test('the three sections are distinct', () => {
		const sections = [UPKEEP_ID, INBOX_ID, VALUES_ID].map((id) => stoplightsSlot(id).section);
		expect(sections).toEqual(['upkeep', 'inbox', 'daily']);
	});

	// NO STOPLIGHTS SLOT CARRIES A LABEL. Its tooltip is a legend naming the
	// readouts in the group, which stand in the readout documents; a label here
	// could only be filled by spelling them, which is exactly what this feature
	// stopped doing. A slot that regrew one would be a spelled legend sneaking
	// back in, and nothing about the drawn bar would betray it.
	test('no stoplights slot carries a label to spell a legend into', () => {
		for (const id of [UPKEEP_ID, INBOX_ID, VALUES_ID]) {
			expect(stoplightsSlot(id)).not.toHaveProperty('label');
		}
	});

	// Each stoplights slot names its GROUP and nothing else about a readout —
	// `readouts/alan-harness-stoplights.domain.md`. A readout slug, a habit key, an inbox
	// key or a value slug appearing on one would be that line broken.
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

// Criterion 3: the two `ops project check` / `deploy` timers are DELETED, and
// their removal is the decision rather than a side effect. This is the guard
// against a future builder restoring them as a convenience — the outcome the
// criterion names. This holds the id half, which no type can.
describe('the retired command-duration timers', () => {
	test('no slot carries either timer\'s id', () => {
		const ids = SLOTS.map((s) => s.id);
		expect(ids).not.toContain('opsStatusBar.timers.check');
		expect(ids).not.toContain('opsStatusBar.timers.deploy');
	});
});
