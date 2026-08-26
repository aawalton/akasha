/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { describe, expect, test } from 'bun:test';
import type { DailyValues } from '../../../../readouts/daily-stoplights.ts';
import { type ReadOutcomes, settleReads } from './render';
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
} from './render-fixtures';
import type { UsageReading } from './usage';

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

// The two cross-account means come from the page query service, and settle on their
// own success and failure like every other read here.
describe('usage slots — their own independent read', () => {
	test('both means render from the usage read', () => {
		const items = render(allFresh());
		expect(items[sessionIdx].text).toBe('42%');
		expect(items[weeklyIdx].text).toBe('7%');
	});

	// The isolation this read bought: a page query outage must mark TWO items stale,
	// not the whole bar.
	test('the usage read throwing leaves every other section fresh', () => {
		const items = render({ ...allFresh(), usage: fail('page query service down') });
		expect(items[dailyIdx].text).toBe(DAILY_FRESH.glyphs);
		expect(items[inboxIdx].text).toBe(INBOX_FRESH);
		expect(items[upkeepIdx].text).toBe(UPKEEP_FRESH);
		expect(items[dailyIdx].tooltip).not.toContain('stale');
		// Only the two usage items say stale.
		expect(items[sessionIdx].tooltip).toContain('stale');
		expect(items[weeklyIdx].tooltip).toContain('stale');
	});

	test('exactly two items go stale on a usage outage', () => {
		const items = render({ ...allFresh(), usage: fail('page query service down') });
		const stale = items.filter((i) => String(i.tooltip).includes('stale'));
		expect(stale.length).toBe(2);
	});

	// The behaviour `render.ts` already had, now reached by the usage section: a failed
	// poll HOLDS the last mean the bar actually saw rather than blanking it to a dash.
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

	// A null mean is the service ANSWERING that it has nothing to average. It draws a
	// dash, and the assertion that matters is that it is not `0%`.
	test('a null mean draws a dash, never 0%', () => {
		const none: UsageReading = { sessionPct: null, weeklyPct: null };
		const items = render({ ...allFresh(), usage: ok(none) });
		expect(items[sessionIdx].text).toBe('—');
		expect(items[weeklyIdx].text).toBe('—');
		expect(items[sessionIdx].text).not.toBe('0%');
		expect(items[weeklyIdx].text).not.toBe('0%');
		// Fresh, not stale — the service answered; it just had nothing to report.
		expect(items[sessionIdx].tooltip).not.toContain('stale');
	});

	// Today's live case: the session query does not exist yet, so its half is null while
	// the weekly half carries a real mean. One dash, one percent, neither a zero.
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
