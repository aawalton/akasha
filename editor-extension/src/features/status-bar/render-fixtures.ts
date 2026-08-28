import type { StoplightLegends } from './legends.ts';
import {
	applyToItems,
	type FreshAts,
	type ReadOutcomes,
	type RenderItem,
	type SettledReads,
	settleReads,
} from './render.ts';
import { SLOTS } from './slots.ts';
import type { UsageReading } from './usage.ts';

export const UPKEEP_LEGEND = 'Plants · Activity · Sleep · Surplus · Capacity · Safety';
export const INBOX_LEGEND = 'email · tasks · temper-tasks · unread-texts · questions';

export const LEGENDS_IN: StoplightLegends = {
	upkeep: UPKEEP_LEGEND,
	inbox: INBOX_LEGEND,
	daily: 'Faith · Love · Health · Learn · Fun · Wealth',
};

export const NO_FRESH = {
	daily: undefined,
	inbox: undefined,
	upkeep: undefined,
	usage: undefined,
} as const;
export const NOW = 1_700_000_000_000;

export const USAGE_FRESH: UsageReading = { sessionPct: 42, weeklyPct: 7 };

const SESSION_ID = 'opsStatusBar.usage.session';
const WEEKLY_ID = 'opsStatusBar.usage.weekly';
const DAILY_ID = 'opsStatusBar.stoplights';
const INBOX_ID = 'opsStatusBar.inboxStoplights';
const UPKEEP_ID = 'opsStatusBar.upkeepStoplights';

export const sessionIdx = SLOTS.findIndex((s) => s.id === SESSION_ID);
export const weeklyIdx = SLOTS.findIndex((s) => s.id === WEEKLY_ID);
export const dailyIdx = SLOTS.findIndex((s) => s.id === DAILY_ID);
export const inboxIdx = SLOTS.findIndex((s) => s.id === INBOX_ID);
export const upkeepIdx = SLOTS.findIndex((s) => s.id === UPKEEP_ID);

export const INIT = 'INIT';

function freshItems(): readonly RenderItem[] {
	return SLOTS.map(() => ({ text: INIT, tooltip: '' }));
}

export function ok<T>(value: T): PromiseFulfilledResult<T> {
	return { status: 'fulfilled', value };
}

export function fail(msg: string): PromiseRejectedResult {
	return { status: 'rejected', reason: new Error(msg) };
}

export function render(
	outcomes: ReadOutcomes,
	legends: StoplightLegends = LEGENDS_IN
): readonly RenderItem[] {
	const items = freshItems();
	const reads: SettledReads = settleReads(outcomes, NO_FRESH, NOW);
	applyToItems(items, reads, legends);
	return items;
}

export function renderPolls(
	first: ReadOutcomes,
	second: ReadOutcomes,
	legendsFirst: StoplightLegends = LEGENDS_IN,
	legendsSecond: StoplightLegends = LEGENDS_IN
): readonly RenderItem[] {
	const items = freshItems();
	const reads = settleReads(first, NO_FRESH, NOW);
	applyToItems(items, reads, legendsFirst);
	const carried: FreshAts = {
		daily: reads.daily.lastFreshAt,
		inbox: reads.inbox.lastFreshAt,
		upkeep: reads.upkeep.lastFreshAt,
		usage: reads.usage.lastFreshAt,
	};
	applyToItems(items, settleReads(second, carried, NOW + 60_000), legendsSecond);
	return items;
}
