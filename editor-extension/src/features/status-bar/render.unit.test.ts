/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { describe, expect, test } from 'bun:test';
import type { DailyValues } from '../../../../readouts/daily-stoplights.ts';
import { NO_LEGENDS } from './legends';
import { type ReadOutcomes, settleReads } from './render';
import {
	dailyIdx,
	fail,
	inboxIdx,
	INBOX_LEGEND,
	INIT,
	LEGENDS_IN,
	NO_FRESH,
	NOW,
	ok,
	render,
	renderPolls,
	sessionIdx,
	upkeepIdx,
	UPKEEP_LEGEND,
	USAGE_FRESH,
	weeklyIdx,
} from './render-fixtures';

const DAILY_FRESH: DailyValues = {
	glyphs: '🔵🟢🟡🔴⚫🟢',
	faces: [
		{ value: 'faith', face: 'Selah' },
		{ value: 'love', face: 'Ruby' },
		{ value: 'health', face: 'Elaine' },
		{ value: 'learn', face: 'Lali' },
		{ value: 'fun', face: 'Zeli' },
		{ value: 'wealth', face: 'Vera' },
	],
};
const INBOX_FRESH = '🔵🔵🔵🔵🔵🔵';
const UPKEEP_FRESH = '🟢🟡🔴⚫🔵🟢';

function allFresh(): ReadOutcomes {
	return {
		daily: ok(DAILY_FRESH),
		inbox: ok(INBOX_FRESH),
		upkeep: ok(UPKEEP_FRESH),
		usage: ok(USAGE_FRESH),
	};
}

describe('settleReads — each read settles on its own success/failure', () => {
	test('a rejected read leaves the other sections\' values intact', () => {
		const reads = settleReads({ ...allFresh(), usage: fail('page query down') }, NO_FRESH, NOW);
		expect(reads.usage.value).toBeUndefined();
		expect(reads.usage.stale).toBe(true);
		// The healthy reads keep their fresh values — not blanked by the sibling failure.
		expect(reads.daily.value).toBe(DAILY_FRESH);
		expect(reads.daily.stale).toBe(false);
		expect(reads.inbox.value).toBe(INBOX_FRESH);
		expect(reads.inbox.stale).toBe(false);
		expect(reads.upkeep.value).toBe(UPKEEP_FRESH);
		expect(reads.upkeep.stale).toBe(false);
	});

	test('all fulfilled → all fresh, none stale', () => {
		const reads = settleReads(allFresh(), NO_FRESH, NOW);
		expect(reads.usage.stale).toBe(false);
		expect(reads.daily.stale).toBe(false);
		expect(reads.inbox.stale).toBe(false);
		expect(reads.upkeep.stale).toBe(false);
		expect(reads.usage.lastFreshAt).toBe(NOW);
	});
});

describe('applyToItems — one flaky read does not blank the healthy sections', () => {
	test('daily-values read throws → inbox + health still render fresh', () => {
		const items = render({ ...allFresh(), daily: fail('formula error') });
		// The healthy sections render their fresh values.
		expect(items[inboxIdx].text).toBe(INBOX_FRESH);
		expect(items[upkeepIdx].text).toBe(UPKEEP_FRESH);
		// The failed section retains its last value and is marked stale.
		expect(items[dailyIdx].text).toBe(INIT);
		expect(items[dailyIdx].tooltip).toContain('stale');
		// The healthy sections carry no stale suffix.
		expect(items[inboxIdx].tooltip).not.toContain('stale');
		expect(items[upkeepIdx].tooltip).not.toContain('stale');
	});

	test('inbox read throws → daily-values + health still render fresh', () => {
		const items = render({ ...allFresh(), inbox: fail('cache miss') });
		// The healthy sections render their fresh values.
		expect(items[dailyIdx].text).toBe(DAILY_FRESH.glyphs);
		expect(items[upkeepIdx].text).toBe(UPKEEP_FRESH);
		// The failed section retains its last value and is marked stale.
		expect(items[inboxIdx].text).toBe(INIT);
		expect(items[inboxIdx].tooltip).toContain('stale');
		// The healthy sections carry no stale suffix.
		expect(items[dailyIdx].tooltip).not.toContain('stale');
		expect(items[upkeepIdx].tooltip).not.toContain('stale');
	});

	test('health read throws → daily-values + inbox still render fresh', () => {
		const items = render({ ...allFresh(), upkeep: fail('no daily-tracking row') });
		// The healthy sections render their fresh values.
		expect(items[dailyIdx].text).toBe(DAILY_FRESH.glyphs);
		expect(items[inboxIdx].text).toBe(INBOX_FRESH);
		// The failed section retains its last value and is marked stale.
		expect(items[upkeepIdx].text).toBe(INIT);
		expect(items[upkeepIdx].tooltip).toContain('stale');
		// The healthy sections carry no stale suffix.
		expect(items[dailyIdx].tooltip).not.toContain('stale');
		expect(items[inboxIdx].tooltip).not.toContain('stale');
	});

	test('all reads succeed → every representative section renders fresh', () => {
		const items = render(allFresh());
		expect(items[sessionIdx].text).toBe('42%');
		expect(items[weeklyIdx].text).toBe('7%');
		expect(items[dailyIdx].text).toBe(DAILY_FRESH.glyphs);
		expect(items[inboxIdx].text).toBe(INBOX_FRESH);
		expect(items[upkeepIdx].text).toBe(UPKEEP_FRESH);
		expect(items[sessionIdx].tooltip).not.toContain('stale');
		// The daily-values tooltip shows just each value's face persona — names only,
		// the value labels dropped (Alan has the value order memorized) (#15811).
		expect(items[dailyIdx].tooltip).toBe('Selah · Ruby · Elaine · Lali · Zeli · Vera');
	});

	test('a null face (no persona serves a value) shows an em-dash placeholder, holding its slot', () => {
		const items = render({
			...allFresh(),
			daily: ok({
				glyphs: '⚫⚫⚫⚫⚫⚫',
				faces: [
					{ value: 'faith', face: null },
					{ value: 'love', face: 'Ruby' },
					{ value: 'health', face: null },
					{ value: 'learn', face: null },
					{ value: 'fun', face: null },
					{ value: 'wealth', face: null },
				],
			}),
		});
		expect(items[dailyIdx].tooltip).toBe('— · Ruby · — · — · — · —');
	});
});

// The three stoplights slots share one render branch and are told apart only by
// the read each declares. A crossed wire renders a neighbour's glyphs — a
// dispatch bug wearing a data bug's face, which no colour on the bar can betray.
describe('applyToItems — each stoplights group renders its OWN read', () => {
	test('health, inbox and values each take their own glyph string', () => {
		const items = render(allFresh());
		expect(items[upkeepIdx].text).toBe(UPKEEP_FRESH);
		expect(items[inboxIdx].text).toBe(INBOX_FRESH);
		expect(items[dailyIdx].text).toBe(DAILY_FRESH.glyphs);
	});

	test('only the health slot moves when only the health read moves', () => {
		const moved = '⚫⚫⚫⚫⚫⚫';
		const items = render({ ...allFresh(), upkeep: ok(moved) });
		expect(items[upkeepIdx].text).toBe(moved);
		expect(items[inboxIdx].text).toBe(INBOX_FRESH);
		expect(items[dailyIdx].text).toBe(DAILY_FRESH.glyphs);
	});

	// The health tooltip is the group's legend, following the inbox group's
	// precedent — never the values group's face-persona tooltip.
	test('the health tooltip is the group legend, on a healthy read', () => {
		const items = render(allFresh());
		expect(items[upkeepIdx].tooltip).toBe(UPKEEP_LEGEND);
	});

	test('the health tooltip stays the group legend on a failed read, plus the stale suffix', () => {
		const items = render({ ...allFresh(), upkeep: fail('no daily-tracking row') });
		expect(items[upkeepIdx].tooltip).toStartWith(UPKEEP_LEGEND);
		expect(items[upkeepIdx].tooltip).toContain('stale');
	});

	test('each group takes its OWN legend, not a neighbour\'s', () => {
		const items = render(allFresh());
		expect(items[upkeepIdx].tooltip).toBe(UPKEEP_LEGEND);
		expect(items[inboxIdx].tooltip).toBe(INBOX_LEGEND);
	});
});

// THE LEGEND ARRIVES LATER THAN THE READING, and may never arrive at all. Both are
// ordinary states, not faults: a group whose legend has not landed draws its circles
// with no tooltip, and MUST NOT lose them, blank them, or show an error in their
// place. `readouts/readout-system.domain.md` — a row a readout cannot read costs its own
// reading only — one level up.
describe('applyToItems — a legend that has not arrived costs only the tooltip', () => {
	test('the glyphs still draw with no legend at all', () => {
		const items = render(allFresh(), NO_LEGENDS);
		expect(items[upkeepIdx].text).toBe(UPKEEP_FRESH);
		expect(items[inboxIdx].text).toBe(INBOX_FRESH);
		expect(items[dailyIdx].text).toBe(DAILY_FRESH.glyphs);
	});

	test('a group with no legend shows NO tooltip rather than an error or a placeholder', () => {
		const items = render(allFresh(), NO_LEGENDS);
		expect(items[upkeepIdx].tooltip).toBeUndefined();
		expect(items[inboxIdx].tooltip).toBeUndefined();
	});

	test('the daily group keeps its face tooltip, which is not a legend', () => {
		const items = render(allFresh(), NO_LEGENDS);
		expect(items[dailyIdx].tooltip).toBe('Selah · Ruby · Elaine · Lali · Zeli · Vera');
	});

	test('one group\'s missing legend leaves the other two legends standing', () => {
		const items = render(allFresh(), { ...LEGENDS_IN, upkeep: undefined });
		expect(items[upkeepIdx].tooltip).toBeUndefined();
		expect(items[inboxIdx].tooltip).toBe(INBOX_LEGEND);
		expect(items[upkeepIdx].text).toBe(UPKEEP_FRESH);
	});

	test('a stale read with no legend still says it is stale, and says nothing else', () => {
		const items = render({ ...allFresh(), upkeep: fail('read failed') }, NO_LEGENDS);
		expect(items[upkeepIdx].tooltip).toContain('stale');
		expect(items[upkeepIdx].tooltip).not.toContain('legend');
	});

	test('a legend arriving on a later poll fills the tooltip that was empty', () => {
		const items = renderPolls(allFresh(), allFresh(), NO_LEGENDS, LEGENDS_IN);
		expect(items[upkeepIdx].tooltip).toBe(UPKEEP_LEGEND);
		expect(items[upkeepIdx].text).toBe(UPKEEP_FRESH);
	});
});

// A failed read holds the glyphs the previous poll rendered and marks itself
// stale — it must never blank, and must never show a wrong colour.
describe('applyToItems — a failed health read holds the previous glyphs', () => {
	test('the health slot keeps the last successful glyphs across a failing poll', () => {
		const items = renderPolls(allFresh(), { ...allFresh(), upkeep: fail('read failed') });
		expect(items[upkeepIdx].text).toBe(UPKEEP_FRESH);
		expect(items[upkeepIdx].tooltip).toContain('stale since');
	});

	test('a first-ever poll that fails leaves the slot blank-safe and says so', () => {
		const items = render({ ...allFresh(), upkeep: fail('read failed') });
		expect(items[upkeepIdx].text).toBe(INIT);
		expect(items[upkeepIdx].tooltip).toContain('no successful poll yet');
	});

	test('the next successful poll clears the staleness', () => {
		const recovered = '🔵🔵🔵🔵🔵🔵';
		const items = renderPolls(
			{ ...allFresh(), upkeep: fail('read failed') },
			{
				...allFresh(),
				upkeep: ok(recovered),
			}
		);
		expect(items[upkeepIdx].text).toBe(recovered);
		expect(items[upkeepIdx].tooltip).not.toContain('stale');
	});
});
