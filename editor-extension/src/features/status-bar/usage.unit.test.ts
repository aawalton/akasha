import { describe, expect, test } from 'bun:test';
import type { Ask, QueryAnswer } from '../../../../readouts/readout-resolver.ts';
import { SLOTS } from './slots.ts';
import { askMean, MEAN_SESSION_USED, MEAN_WEEKLY_USED, readUsage } from './usage.ts';

function askFor(table: Record<string, QueryAnswer | Error>): Ask {
	return (slug: string) => {
		const answer = table[slug];
		if (answer === undefined) { return Promise.reject(new Error(`no stub for ${slug}`)); }
		if (answer instanceof Error) { return Promise.reject(answer); }
		return Promise.resolve(answer);
	};
}

function answer(value: number | null, over: number | null, n = 8): QueryAnswer {
	return { n, value, over, rows: [], faults: [], omitted: [], unfound: [] };
}

const REFUSED = new Error('`claude-accounts-mean-weekly-used` went unanswered here: no page query is named');

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

	test('one refusing beside one answering draws a dash beside a real percent', async () => {
		const reading = await readUsage(askFor({
			[MEAN_SESSION_USED]: REFUSED,
			[MEAN_WEEKLY_USED]: answer(40.625, 8),
		}));
		expect(SESSION.read(reading)).toBe('—');
		expect(WEEKLY.read(reading)).toBe('40%');
	});
});
