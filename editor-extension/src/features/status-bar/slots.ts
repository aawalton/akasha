/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * Slot definitions for the status-bar feature. Four sections, five items
 * delimited by three static `|` separators: two cross-account usage items
 * (session %, weekly % means — leftmost), an upkeep stoplights string, an inbox
 * stoplights string, and a daily-values stoplights string (rightmost).
 * VSCode `StatusBarAlignment.Right` orders by descending priority
 * left-to-right; the highest priority sits leftmost. Priorities are multiples
 * of 10, assigned by position so every section boundary has an unambiguous
 * integer slot for its separator — insert a slot and every slot left of it
 * renumbers, so no priority is written by hand.
 *
 * THE BAR COUNTS NOTHING NOW. It carried ten project counts, three merge-queue
 * entry counts, and three branch-scoped step sections; the project model and the
 * merge queue both went, and Alan took the pipeline sections with them. What is
 * left reads no consolidated snapshot and no fold — every item here has its own
 * source, so no two of them can disagree about a number.
 *
 * Each usage slot carries its own `read(source) => value` so that `applyToItems`
 * can iterate the slot registry uniformly, keeping the source → display mapping
 * declarative. Separator slots carry no reader — their `text` and `color` are
 * set once at activation and never refresh.
 *
 * Every slot `label` is a lowercase descriptive label (the tooltip principle):
 * the render layer appends no value, so the label is the whole tooltip (plus a
 * stale suffix).
 *
 * THE THREE STOPLIGHTS SLOTS CARRY NO `label` AT ALL. Their tooltip is a legend
 * naming the readouts drawn in the group, and those names stand in the readout
 * documents rather than in this repository — so the legend cannot be a constant
 * here and is not one. Each of those slots names only its GROUP, via `section`;
 * `legends.ts` reads the names for that group and `render.ts` draws them once
 * they arrive.
 */

import type { SlotDef } from './slot-types.ts';
import { BLUE_HEX, PURPLE_HEX } from './theme.ts';


// A usage mean is null when no claude-account PAGE carried the attribute, or when the
// query that reduces them did not answer; render a dash rather than "NaN%" — and never
// `0%`, which would read as "nothing used". Percent floors to match the `cu` CLI's avg row.
function formatUsagePct(v: number | null): string {
	return v === null ? '—' : `${Math.floor(v)}%`;
}

const RAW_SLOTS: readonly SlotDef[] = [
	// Section 0: usage (cross-account means, leftmost) — mirrors the `cu` avg row.
	// Read from the PAGE QUERY SERVICE. See `usage.ts`.
	{
		kind: 'usage',
		id: 'opsStatusBar.usage.session',
		priority: 0,
		label: 'session usage',
		hex: BLUE_HEX,
		read: (u) => formatUsagePct(u.sessionPct),
	},
	{
		kind: 'usage',
		id: 'opsStatusBar.usage.weekly',
		priority: 0,
		label: 'weekly usage',
		hex: PURPLE_HEX,
		read: (u) => formatUsagePct(u.weeklyPct),
	},

	{ kind: 'separator', id: 'opsStatusBar.sep.usageUpkeep', priority: 0 },

	// Section 1: upkeep stoplights — fetched separately via
	// getUpkeepStoplights. See feature-status-bar.md.
	{
		kind: 'stoplights',
		id: 'opsStatusBar.upkeepStoplights',
		priority: 0,
		section: 'upkeep',
	},

	{ kind: 'separator', id: 'opsStatusBar.sep.upkeepInbox', priority: 0 },

	// Section 2: inbox stoplights — fetched separately via
	// getInboxStoplights. See feature-status-bar.md.
	{
		kind: 'stoplights',
		id: 'opsStatusBar.inboxStoplights',
		priority: 0,
		section: 'inbox',
	},

	{ kind: 'separator', id: 'opsStatusBar.sep.inboxValues', priority: 0 },

	// Section 3: daily-values stoplights (far right) — fetched separately.
	// See feature-status-bar.md.
	{
		kind: 'stoplights',
		id: 'opsStatusBar.stoplights',
		priority: 0,
		section: 'daily',
	},
];

// Stamp descending priorities by position: leftmost (index 0) gets the
// highest, the rightmost gets 10. VSCode requires integer priorities.
export const SLOTS: readonly SlotDef[] = RAW_SLOTS.map((slot, i) => ({
	...slot,
	priority: (RAW_SLOTS.length - i) * 10,
}));
