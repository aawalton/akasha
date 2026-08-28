/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * The stoplight groups' tooltips, which ARRIVE LATER THAN THE BAR DOES.
 *
 * A stoplight group's tooltip is a legend: the names of the readouts drawn in that
 * group, ` · `-joined in the order their circles render. Those names are not this
 * repository's to hold, and are deliberately not written anywhere in this file — a
 * legend spelled here is the defect this module exists to remove. They stand in the
 * readout documents, and
 * `resolveReadoutGroup` in `@shared/status-bar-access` is what answers a group's
 * members and each one's `label`. So the legend can only be READ, and reading it is
 * slow: a group resolve measures about seven seconds against a cold catalog (a fresh
 * extension host has one) and about nothing against a warm one, which the shared
 * module holds for sixty seconds.
 *
 * SEVEN SECONDS IS NOT SOMETHING ACTIVATION MAY SPEND. `activate.ts` awaits its first
 * refresh before the bar is live, and adding a legend resolve to that would have put
 * seven seconds in front of the whole bar to say something about three of its items.
 * So this never joins the poll's `Promise.allSettled`. `pump()` starts whatever is
 * missing and returns at once; the promise settles whenever it settles; the next
 * five-second poll paints whatever has landed. Until then the three stoplight items
 * carry their glyphs and NO tooltip at all — which is the intended state, not a
 * degraded one.
 *
 * A LEGEND THAT NEVER ARRIVES COSTS ONLY ITSELF. Every failure mode here — the
 * resolve rejecting, the group resolving empty, the promise never settling — ends in
 * `read()` still answering `undefined` for that section, and `applyToItems` drawing
 * that group's reading with no tooltip. Never an error string in the tooltip, never a
 * hidden item: `readouts/readout-system.domain.md` says a row a readout cannot read costs its
 * own reading only, and a legend it cannot read is the same shape one level up.
 *
 * THE CEILING IS WHAT MAKES A RETRY POSSIBLE. Without it a resolve that hangs holds
 * `inFlight` forever and that section never tries again for the life of the window.
 * The ceiling is well clear of the seven seconds a cold resolve costs, so it cuts off
 * only a resolve that is genuinely stuck, and cutting it off frees the next poll to
 * try again.
 *
 * A LEGEND IS RE-READ, NOT PINNED. A legend names a group's readouts IN THE ORDER
 * THEIR CIRCLES RENDER, and both the membership and that order are answered by the
 * readout documents, which change without a build. A legend held for the life of the
 * window therefore outlives the glyphs beside it: reorder a group's `place` and the
 * circles move on the next five-second poll while the names next to them do not, which
 * reads as a reorder that never landed. So `pump()` reads a legend again once it is
 * older than `LEGEND_TTL_MS`, and the legend already drawn stays up until a new one
 * lands — a refresh that fails or comes back empty costs a tooltip nothing.
 */

import { STOPLIGHTS_SECTIONS, type StoplightsSection } from './slot-types';

// Generous against the ~7s a cold group resolve measures, so a slow-but-working
// resolve is never cut off; short enough that a stuck one frees within a handful of
// polls rather than for the life of the window.
export const LEGEND_CEILING_MS = 30_000;

// How long a legend stands before `pump()` reads it again. Matched to the sixty
// seconds the shared module holds its catalog for, so a refresh resolves against a
// warm catalog and costs about nothing, and no legend can name an order more than a
// catalog's life behind the circles it labels.
export const LEGEND_TTL_MS = 60_000;

// Each group's legend once it has arrived. `undefined` means "not here" and says
// nothing about why — not yet loaded, still loading, and failed are one state to
// every reader, because the drawn result is identical in all three.
export type StoplightLegends = Readonly<Record<StoplightsSection, string | undefined>>;

export const NO_LEGENDS: StoplightLegends = {
	inbox: undefined,
	upkeep: undefined,
	daily: undefined,
};

// How one section's legend is fetched. Kept as a parameter rather than imported so
// this module holds no `@shared/*` dependency and is unit-testable with plain
// promises; `activate.ts` supplies the real per-group reads.
export type LegendRead = (section: StoplightsSection) => Promise<string>;

export type LegendFailure = (section: StoplightsSection, reason: unknown) => undefined;

export type LegendStore = {
	// Whatever has arrived so far. Never throws and never waits.
	readonly read: () => StoplightLegends;
	// Start a load for every section missing a legend or holding a stale one, and
	// return immediately. Safe to call on every poll: a section whose legend is still
	// fresh, and one whose read is already in flight, are both skipped.
	readonly pump: () => undefined;
};

// Reject at the ceiling with what the wait was for, so the reason reaching
// `onFailure` says which group and how long rather than just "timeout".
function withCeiling(
	section: StoplightsSection,
	loading: Promise<string>,
	ceilingMs: number
): Promise<string> {
	return new Promise<string>((resolve, reject) => {
		const timer = setTimeout(() => {
			reject(
				new Error(
					`the ${section} legend did not resolve within ${ceilingMs}ms; the group draws its reading without one`
				)
			);
		}, ceilingMs);
		loading.then(
			(legend) => { clearTimeout(timer); resolve(legend); },
			(reason) => { clearTimeout(timer); reject(reason); }
		);
	});
}

export function createLegendStore(
	load: LegendRead,
	onFailure: LegendFailure,
	ceilingMs: number = LEGEND_CEILING_MS,
	ttlMs: number = LEGEND_TTL_MS
): LegendStore {
	let legends: StoplightLegends = NO_LEGENDS;
	// When each held legend was read. A section absent here has nothing drawn, which
	// is the same call to make as one whose legend has aged out: read it.
	const heldAt = new Map<StoplightsSection, number>();
	const inFlight = new Set<StoplightsSection>();

	const wanted = (section: StoplightsSection): boolean => {
		if (legends[section] === undefined) { return true; }
		const at = heldAt.get(section);
		return at === undefined || Date.now() - at >= ttlMs;
	};

	const pump = (): undefined => {
		for (const section of STOPLIGHTS_SECTIONS) {
			if (inFlight.has(section) || !wanted(section)) { continue; }
			inFlight.add(section);
			void withCeiling(section, load(section), ceilingMs).then(
				(legend) => {
					inFlight.delete(section);
					// A group that resolved to no readouts at all would join with nothing
					// to show; treat the empty string as not-arrived so the next poll asks
					// again rather than pinning an empty tooltip over a legend that reads.
					if (legend === '') { return; }
					legends = { ...legends, [section]: legend };
					heldAt.set(section, Date.now());
				},
				(reason) => {
					inFlight.delete(section);
					// A refresh that fails leaves whatever is drawn standing and is asked
					// for again next poll: a name a minute old reads better than no name.
					onFailure(section, reason);
				}
			);
		}
		return undefined;
	};

	return { read: () => legends, pump };
}
