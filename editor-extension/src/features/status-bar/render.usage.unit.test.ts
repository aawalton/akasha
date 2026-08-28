import { describe, expect, test } from 'bun:test';
import type { DailyValues } from '../../../../readouts/daily-stoplights.ts';
import { type ReadOutcomes, settleReads } from './render.ts';
import {
	dailyIdx,
	fail,
	inboxIdx,
	INIT,
	NO_FRESH,
	NOW,
	ok,
	render,
	renderPolls,
	sessionIdx,
	upkeepIdx,
	USAGE_FRESH,
	weeklyIdx,
} from './render-fixtures.ts';
import type { UsageReading } from './usage.ts';

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

describe('usage slots — their own independent read', () => {
	test('both means render from the usage read', () => {
		const items = render(allFresh());
		expect(items[sessionIdx].text).toBe('42%');
		expect(items[weeklyIdx].text).toBe('7%');
	});

	test('the usage read throwing leaves every other section fresh', () => {
		const items = render({ ...allFresh(), usage: fail('page query service down') });
		expect(items[dailyIdx].text).toBe(DAILY_FRESH.glyphs);
		expect(items[inboxIdx].text).toBe(INBOX_FRESH);
		expect(items[upkeepIdx].text).toBe(UPKEEP_FRESH);
		expect(items[dailyIdx].tooltip).not.toContain('stale');
		expect(items[sessionIdx].tooltip).toContain('stale');
		expect(items[weeklyIdx].tooltip).toContain('stale');
	});

	test('exactly two items go stale on a usage outage', () => {
		const items = render({ ...allFresh(), usage: fail('page query service down') });
		const stale = items.filter((i) => String(i.tooltip).includes('stale'));
		expect(stale.length).toBe(2);
	});

	test('a failing usage poll keeps the previous means and dates them', () => {
		const items = renderPolls(allFresh(), { ...allFresh(), usage: fail('service down') });
		expect(items[sessionIdx].text).toBe('42%');
		expect(items[weeklyIdx].text).toBe('7%');
		expect(items[sessionIdx].tooltip).toContain('stale since');
	});

	test('a first-ever usage poll that fails leaves the items blank-safe and says so', () => {
		const items = render({ ...allFresh(), usage: fail('service down') });
		expect(items[sessionIdx].text).toBe(INIT);
		expect(items[sessionIdx].tooltip).toContain('no successful poll yet');
	});

	test('a null mean draws a dash, never 0%', () => {
		const none: UsageReading = { sessionPct: null, weeklyPct: null };
		const items = render({ ...allFresh(), usage: ok(none) });
		expect(items[sessionIdx].text).toBe('—');
		expect(items[weeklyIdx].text).toBe('—');
		expect(items[sessionIdx].text).not.toBe('0%');
		expect(items[weeklyIdx].text).not.toBe('0%');
		expect(items[sessionIdx].tooltip).not.toContain('stale');
	});

	test('one mean present and one absent renders a percent beside a dash', () => {
		const half: UsageReading = { sessionPct: null, weeklyPct: 40.625 };
		const items = render({ ...allFresh(), usage: ok(half) });
		expect(items[sessionIdx].text).toBe('—');
		expect(items[weeklyIdx].text).toBe('40%');
	});

	test('the usage section settles on its own success/failure', () => {
		const reads = settleReads({ ...allFresh(), usage: fail('down') }, NO_FRESH, NOW);
		expect(reads.usage.value).toBeUndefined();
		expect(reads.usage.stale).toBe(true);
		expect(reads.daily.stale).toBe(false);
		expect(reads.daily.value).toBe(DAILY_FRESH);
	});
});
