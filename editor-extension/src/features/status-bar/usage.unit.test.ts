/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * The usage reader's cases: a good answer, a query that refuses, and an answer covering
 * zero accounts.
 *
 * THE LOAD-BEARING ASSERTION IS THE ABSENCE OF ZERO. Every failure and empty case here is
 * checked to produce `null` — never `0`, and never a `0%` once formatted. A bar reading
 * `0%` says "nothing used", which is the most reassuring thing it could possibly say and
 * the exact opposite of what an outage means. The iOS route this reader is modelled on
 * maps an empty answer to `0` deliberately, so a future edit copying one more line from it
 * is a live risk rather than an imagined one, and `noneOfTheseIsZero` is the guard.
 *
 * WHAT IS NO LONGER TESTED HERE. This reader took a `fetch` and parsed a wire body, so it
 * owned the malformed-body cases: a non-JSON reply, a missing `n`, a `value` arriving as a
 * string, a 404 status. It takes an `Ask` now and is handed an answer already shaped, so
 * none of those defects can reach it and a test for them would assert on nothing.
 */

import { describe, expect, test } from 'bun:test';
import type { Ask, QueryAnswer } from '../../../../readouts/readout-resolver.ts';
import { SLOTS } from './slots';
import { askMean, MEAN_SESSION_USED, MEAN_WEEKLY_USED, readUsage } from './usage';

// An ask answering each slug from a table, so a test says only what it cares about.
// A slug whose entry is an Error refuses the way a query that cannot be answered does.
function askFor(table: Record<string, QueryAnswer | Error>): Ask {
	return (slug: string) => {
		const answer = table[slug];
		if (answer === undefined) { return Promise.reject(new Error(`no stub for ${slug}`)); }
		if (answer instanceof Error) { return Promise.reject(answer); }
		return Promise.resolve(answer);
	};
}

// The shape `askHere` hands over, as `answerIn` builds it.
function answer(value: number | null, over: number | null, n = 8): QueryAnswer {
	return { n, value, over, rows: [], faults: [], omitted: [], unfound: [] };
}

const REFUSED = new Error('`claude-accounts-mean-weekly-used` went unanswered here: no page query is named');

// The one assertion every failure case owes. A `null` is the em dash; a `0` is the lie.
function noneOfTheseIsZero(...readings: readonly (number | null)[]): undefined {
	for (const reading of readings) {
		expect(reading).toBeNull();
		expect(reading).not.toBe(0);
	}
	return undefined;
}

describe('askMean — one named query reduced to a percent or a null', () => {
	test('a good answer yields its value, unrounded for the formatter to floor', async () => {
		const read = await askMean(MEAN_WEEKLY_USED, askFor({ [MEAN_WEEKLY_USED]: answer(40.625, 8) }));
		expect(read.ok).toBe(true);
		if (read.ok) { expect(read.pct).toBe(40.625); }
	});

	test('a query that refuses is a failure, not a zero', async () => {
		const read = await askMean(MEAN_WEEKLY_USED, askFor({ [MEAN_WEEKLY_USED]: REFUSED }));
		expect(read.ok).toBe(false);
		if (!read.ok) { expect(read.why).toContain('went unasked'); }
	});

	// The deliberate divergence from the iOS route, which maps this to 0.
	test('an answer over ZERO accounts is a null reading, never 0', async () => {
		const read = await askMean(MEAN_WEEKLY_USED, askFor({ [MEAN_WEEKLY_USED]: answer(null, 0, 0) }));
		expect(read.ok).toBe(true);
		if (read.ok) { noneOfTheseIsZero(read.pct); }
	});

	test('an answer with a null `over` is a null reading, never 0', async () => {
		const read = await askMean(MEAN_WEEKLY_USED, askFor({ [MEAN_WEEKLY_USED]: answer(null, null, 0) }));
		expect(read.ok).toBe(true);
		if (read.ok) { noneOfTheseIsZero(read.pct); }
	});

	test('an answer over accounts that carried no value is a null reading, never 0', async () => {
		const read = await askMean(MEAN_WEEKLY_USED, askFor({ [MEAN_WEEKLY_USED]: answer(null, 8) }));
		expect(read.ok).toBe(true);
		if (read.ok) { noneOfTheseIsZero(read.pct); }
	});

	// A genuine cross-account mean of zero is the ONE case that may render `0%`: the
	// query answered, over real accounts, that nothing has been used. Pinned so the
	// "never zero" rule above cannot be over-applied into dropping a true reading.
	test('a genuine mean of 0 over real accounts survives as 0, not a dash', async () => {
		const read = await askMean(MEAN_WEEKLY_USED, askFor({ [MEAN_WEEKLY_USED]: answer(0, 8) }));
		expect(read.ok).toBe(true);
		if (read.ok) { expect(read.pct).toBe(0); }
	});
});

describe('readUsage — the two means, settled together', () => {
	test('both answering yields both means', async () => {
		const reading = await readUsage(askFor({
			[MEAN_SESSION_USED]: answer(12.5, 8),
			[MEAN_WEEKLY_USED]: answer(40.625, 8),
		}));
		expect(reading.sessionPct).toBe(12.5);
		expect(reading.weeklyPct).toBe(40.625);
	});

	// One query answering and the other not. The weekly figure must still reach the bar,
	// and the session item must show a dash rather than taking the whole read down or
	// rendering 0%.
	test('the session query refusing leaves the weekly mean fresh and the session a dash', async () => {
		const reading = await readUsage(askFor({
			[MEAN_SESSION_USED]: REFUSED,
			[MEAN_WEEKLY_USED]: answer(40.625, 8),
		}));
		expect(reading.weeklyPct).toBe(40.625);
		noneOfTheseIsZero(reading.sessionPct);
	});

	test('the weekly query refusing leaves the session mean fresh', async () => {
		const reading = await readUsage(askFor({
			[MEAN_SESSION_USED]: answer(12, 8),
			[MEAN_WEEKLY_USED]: REFUSED,
		}));
		expect(reading.sessionPct).toBe(12);
		noneOfTheseIsZero(reading.weeklyPct);
	});

	// The outage. Throwing is what buys the retain-last-value behaviour in `render.ts` —
	// resolving with two nulls would blank a reading that was true a poll ago.
	test('NEITHER query answering throws, so the section goes stale rather than blank', async () => {
		const dead = askFor({ [MEAN_SESSION_USED]: REFUSED, [MEAN_WEEKLY_USED]: REFUSED });
		await expect(readUsage(dead)).rejects.toThrow('neither usage query answered');
	});

	test('both answering over zero accounts resolves to two dashes, never two zeroes', async () => {
		const reading = await readUsage(askFor({
			[MEAN_SESSION_USED]: answer(null, 0, 0),
			[MEAN_WEEKLY_USED]: answer(null, 0, 0),
		}));
		noneOfTheseIsZero(reading.sessionPct, reading.weeklyPct);
	});
});

// The reader's nulls have to survive the trip through the slot readers, which is where
// they become the text Alan actually sees. These assert on `SLOTS` itself rather than
// re-implementing the formatter, so a formatter change that reintroduced `0%` fails here.
describe('the two usage slots — what a null reading DRAWS', () => {
	function usageSlot(id: string): { read: (u: { sessionPct: number | null; weeklyPct: number | null }) => string } {
		const slot = SLOTS.find((s) => s.id === id);
		if (slot === undefined) { throw new Error(`no slot ${id}`); }
		if (slot.kind !== 'usage') { throw new Error(`slot ${id} is ${slot.kind}, expected usage`); }
		return slot;
	}

	const SESSION = usageSlot('opsStatusBar.usage.session');
	const WEEKLY = usageSlot('opsStatusBar.usage.weekly');

	test('both slots read the usage reading, each its own field', () => {
		const reading = { sessionPct: 12.9, weeklyPct: 40.625 };
		expect(SESSION.read(reading)).toBe('12%');
		expect(WEEKLY.read(reading)).toBe('40%');
	});

	test('a null reading draws an em dash on both, never `0%`', () => {
		const none = { sessionPct: null, weeklyPct: null };
		expect(SESSION.read(none)).toBe('—');
		expect(WEEKLY.read(none)).toBe('—');
		expect(SESSION.read(none)).not.toBe('0%');
		expect(WEEKLY.read(none)).not.toBe('0%');
	});

	// A refused session beside a healthy weekly draws a dash and a real percent.
	test('one refusing beside one answering draws a dash beside a real percent', async () => {
		const reading = await readUsage(askFor({
			[MEAN_SESSION_USED]: REFUSED,
			[MEAN_WEEKLY_USED]: answer(40.625, 8),
		}));
		expect(SESSION.read(reading)).toBe('—');
		expect(WEEKLY.read(reading)).toBe('40%');
	});
});
