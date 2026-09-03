import type { StoplightsSection } from './slot-types.ts';

/**
 * The labels a stoplight group's tooltip names, one section at a time.
 *
 * This was a store: it fetched each legend on a TTL, held one read in flight per section, and put
 * a ceiling on how long a fetch could take before the group drew its reading without labels. All
 * of that machinery existed because the legend was fetched on its own, separately from the glyphs
 * drawn beside it. `drawGroup` now reads a group once and answers both, so a legend costs no call
 * of its own and there is nothing left to schedule, deduplicate or time out.
 *
 * What survives is the one behaviour that was never about fetching: a section whose read failed
 * keeps the labels it last named, so the tooltip says which readouts the stale glyphs represent
 * rather than going blank.
 */
export type StoplightLegends = Readonly<Record<StoplightsSection, string | undefined>>;

export const NO_LEGENDS: StoplightLegends = {
	inbox: undefined,
	upkeep: undefined,
};
