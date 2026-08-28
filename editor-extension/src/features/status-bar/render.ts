/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * Pure render core for the status-bar feature (Purity: pure core / effectful
 * shell). Holds the settle + render decision for the four independent reads
 * so `activate.ts` stays the thin effectful shell (secrets, vscode items,
 * poll timer). This module imports `vscode` as a TYPE ONLY (`import type`,
 * fully erased at runtime), so it carries no runtime vscode dependency and is
 * unit-testable in bun with plain fake items.
 *
 * The four reads — the daily-values stoplights, the cached inbox stoplights
 * string, the upkeep stoplights string, and the cross-account usage means —
 * are genuinely independent data sources.
 * `settleReads` settles each on its OWN success/failure so one flaky read can
 * never blank the healthy others; `applyToItems` renders each section from its
 * own `SectionResult`, with a per-section stale suffix. See
 * `docs/feature-status-bar.md` (Failure model).
 *
 * EVERY READ IS ITS OWN ENTRY. There was once a consolidated snapshot RPC behind
 * most of the bar, and a page query outage marking every count on it stale to say
 * something about the two usage means is what argued usage out of it; the counts it
 * fed have all gone, so nothing is consolidated here any more.
 */

import type { DailyValues, ValueFace } from '../../../../readouts/daily-stoplights.ts';
import type * as vscode from 'vscode';
import type { StoplightLegends } from './legends.ts';
import { SLOTS } from './slots.ts';
import type { UsageReading } from './usage.ts';

// One read's outcome for its section: the fresh value (or undefined when the
// read failed and the section retains its last value), whether it is stale, and
// the timestamp of that section's last successful read (drives the suffix).
export type SectionResult<T> = {
	readonly value: T | undefined;
	readonly stale: boolean;
	readonly lastFreshAt: number | undefined;
};

// The four settled sections, one per independent read. Each stoplights slot names
// its own key here via `slot.section`, so the three groups' keys are exactly the
// `StoplightsSection` members. The daily-values section carries the structured
// `DailyValues` (glyph string + per-value faces) so the render can draw both the
// item text and the face tooltip from it; the inbox and upkeep sections carry a
// bare glyph string, which carries no per-circle dimension of its own and so takes
// the group's legend as its tooltip. That legend is NOT one of these four reads —
// it arrives on its own schedule via `legends.ts` and reaches `applyToItems` as a
// separate argument.
// The usage section carries the two cross-account means its two slots read.
export type SettledReads = {
	readonly daily: SectionResult<DailyValues>;
	readonly inbox: SectionResult<string>;
	readonly upkeep: SectionResult<string>;
	readonly usage: SectionResult<UsageReading>;
};

// The raw `Promise.allSettled` outcomes for the four reads.
export type ReadOutcomes = {
	readonly daily: PromiseSettledResult<DailyValues>;
	readonly inbox: PromiseSettledResult<string>;
	readonly upkeep: PromiseSettledResult<string>;
	readonly usage: PromiseSettledResult<UsageReading>;
};

// Per-section "last successful read at" timestamps carried across polls.
export type FreshAts = {
	readonly daily: number | undefined;
	readonly inbox: number | undefined;
	readonly upkeep: number | undefined;
	readonly usage: number | undefined;
};

// The minimal status-bar-item surface `applyToItems` mutates — exactly the two
// fields it writes. A `vscode.StatusBarItem` structurally satisfies this, so
// `activate.ts` passes its real items directly; keeping the interface this
// shallow lets the render core be unit-tested with plain objects and no vscode
// runtime (Complexity: strict with what you produce, generous with what you
// consume). `tooltip` mirrors the vscode field's type so the real items assign.
export type RenderItem = {
	text: string;
	tooltip: string | vscode.MarkdownString | undefined;
};

function settleSection<T>(
	settled: PromiseSettledResult<T>,
	prevFreshAt: number | undefined,
	now: number
): SectionResult<T> {
	if (settled.status === 'fulfilled') {
		return { value: settled.value, stale: false, lastFreshAt: now };
	}
	return { value: undefined, stale: true, lastFreshAt: prevFreshAt };
}

// Settle the four reads into per-section results, each on its OWN
// success/failure. A rejection in one read blanks only that section (retaining
// its last value + marking it stale); the others render fresh from their
// own successful reads. This is the fix: one flaky read can never blank the
// healthy others (#14021).
export function settleReads(outcomes: ReadOutcomes, prev: FreshAts, now: number): SettledReads {
	return {
		daily: settleSection(outcomes.daily, prev.daily, now),
		inbox: settleSection(outcomes.inbox, prev.inbox, now),
		upkeep: settleSection(outcomes.upkeep, prev.upkeep, now),
		usage: settleSection(outcomes.usage, prev.usage, now),
	};
}

function formatStaleSuffix(stale: boolean, lastFreshAt: number | undefined): string {
	if (!stale) { return ''; }
	if (lastFreshAt !== undefined) {
		const t = new Date(lastFreshAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
		return ` (stale since ${t})`;
	}
	return ' (stale — no successful poll yet)';
}

// The daily-values tooltip: just each value's face persona for today, ` · `
// -separated in the fixed value order the glyphs render in.
// The value names are omitted deliberately (#15811): the six values render in a
// fixed order Alan has memorized, so labeling each is redundant ink — the tooltip
// carries only the daily-varying answer the six colors cannot, *who to reach out
// to next*. This is the **daily-values face carve-out** of the tooltip principle
// (built from a read, not the slot label; see docs/feature-status-bar.md). A value
// with no face today shows `—`, holding its slot so the faces stay aligned with
// the glyphs.
function faceTooltip(faces: readonly ValueFace[]): string {
	return faces.map((f) => f.face ?? '—').join(' · ');
}

// A stoplights group's tooltip, from a legend that may not have arrived. It is built
// from whichever of the two parts is present, and NOTHING is invented for a missing
// one: no legend and no staleness is `undefined` (vscode draws no tooltip at all),
// which is what a group whose legend could not be loaded must show. It must never
// read as an error, and the item must still draw its glyphs — the legend is the only
// thing a failed legend read is allowed to cost. See `legends.ts`.
function legendTooltip(legend: string | undefined, suffix: string): string | undefined {
	const shown = `${legend ?? ''}${suffix}`.trim();
	return shown === '' ? undefined : shown;
}

// Write the settled reads onto the status-bar items. Each section renders from
// its OWN read: the two usage slots from `reads.usage`, and each stoplights
// slot from the read its `section` names — each with its own stale suffix. An
// undefined section value retains the item's last text (never blanks it).
// `legends` carries whatever each stoplights group's legend load has produced so far
// — see `legends.ts`. It is a separate parameter rather than a fifth `SettledReads`
// entry on purpose: the four reads are polled together every five seconds and drive
// the items' TEXT, while a legend is fetched once, lands whenever it lands, and drives
// only a tooltip. Folding it in would have made a slow legend look like a stale
// reading.
export function applyToItems(
	items: readonly RenderItem[],
	reads: SettledReads,
	legends: StoplightLegends
): undefined {
	// Tooltips are the slot's lowercase descriptive label plus the stale suffix —
	// no value is appended (the value is the item's own text). See the tooltip
	// principle in docs/feature-status-bar.md.
	for (let i = 0; i < SLOTS.length; i++) {
		const slot = SLOTS[i];
		const item = items[i];
		if (slot.kind === 'separator') {
		} else if (slot.kind === 'usage') {
			// Fed by its own read (the page query service), so the two usage items can go
			// stale while every count beside them stays live, and the reverse. A read that
			// REJECTED retains the last mean the bar actually saw rather than blanking it —
			// see the two-level rule in `usage.ts`, which throws only on a total outage.
			const section = reads.usage;
			const suffix = formatStaleSuffix(section.stale, section.lastFreshAt);
			const text = section.value === undefined ? undefined : slot.read(section.value);
			item.text = text === undefined ? item.text : text;
			item.tooltip = `${slot.label}${suffix}`;
		} else if (slot.kind === 'stoplights') {
			// Fetched outside the snapshot; each stoplights slot renders from the read
			// its own `section` names, retaining its last value when undefined (that
			// read's error). Indexing the settled reads keeps the group→read mapping on
			// the slot rather than in an id comparison here — a fourth group needs no
			// branch, and one whose section is not a `SettledReads` key fails to compile.
			const section = reads[slot.section];
			const suffix = formatStaleSuffix(section.stale, section.lastFreshAt);
			const value = section.value;
			const legend = legends[slot.section];
			if (value === undefined) {
				item.tooltip = legendTooltip(legend, suffix);
			} else if (typeof value === 'string') {
				// A bare glyph string carries no per-circle dimension beyond its colors,
				// so the tooltip is the group's legend — the names of the readouts drawn
				// in it, read from their own documents rather than written here.
				item.text = value;
				item.tooltip = legendTooltip(legend, suffix);
			} else {
				// Daily values: the glyph string is the item text; the tooltip pairs each
				// value with its face persona (the face carve-out). The group's legend is
				// the fallback for this group only, shown on the branch above when the
				// read failed and there are no faces to pair.
				item.text = value.glyphs;
				item.tooltip = `${faceTooltip(value.faces)}${suffix}`;
			}
		}
	}
	return undefined;
}
