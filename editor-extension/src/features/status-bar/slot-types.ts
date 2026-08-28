/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import type { UsageReading } from './usage.ts';

// A cross-account usage mean. Its `read` takes its own source: the two means come from
// the page query service, which reduces the account PAGES.
export type UsageSlotDef = {
	readonly kind: 'usage';
	readonly id: string;
	readonly priority: number;
	readonly label: string;
	readonly hex: string;
	// Returns the fully-formatted display string (e.g. "16%", or "—" for no reading).
	readonly read: (u: UsageReading) => string;
};

export type SeparatorSlotDef = {
	readonly kind: 'separator';
	readonly id: string;
	readonly priority: number;
};

// Which of the separately-fetched reads feeds a stoplights slot. Every member
// must name a key of `render.ts`'s `SettledReads` — `applyToItems` indexes the
// settled reads by this value, so a section with no matching read is a compile
// error there rather than a slot that silently renders nothing.
//
// THE ARRAY IS THE DEFINITION and the type is derived from it, because the legend
// loader in `legends.ts` has to walk the sections and a hand-kept second list would
// drift from this one silently — a fourth group would simply never load a legend.
// These three are GROUP names, which a consumer of a stoplight group is allowed to
// spell; nothing here names an individual readout inside one.
export const STOPLIGHTS_SECTIONS = ['inbox', 'upkeep', 'daily'] as const;

export type StoplightsSection = (typeof STOPLIGHTS_SECTIONS)[number];

// A stoplights item — a single item whose text is a string of per-component
// circle emojis. Unlike every other data slot, its value is NOT read from the
// consolidated snapshot: `activate.ts` fetches each group separately and passes
// the settled results into `applyToItems`, which renders the group named by
// `section`. The slot carries no `read(snapshot)`; its text is multi-colored
// per-circle, so it also carries no single `hex` (the emoji glyphs supply their
// own color).
//
// IT ALSO CARRIES NO `label`, WHICH IS THE POINT. Every other slot's tooltip is a
// phrase written beside it here; a stoplights group's tooltip is a LEGEND naming
// what the group contains, and those names live in the readout documents, not in
// this repository. A `readonly label: string` could only ever be filled by spelling
// them, which is what cost the upkeep group its legend. The legend instead arrives
// from `legends.ts` on its own schedule and is passed into `applyToItems` beside
// the reads.
export type StoplightsSlotDef = {
	readonly kind: 'stoplights';
	readonly id: string;
	readonly priority: number;
	readonly section: StoplightsSection;
};

export type SlotDef = UsageSlotDef | SeparatorSlotDef | StoplightsSlotDef;
