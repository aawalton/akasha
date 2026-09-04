import type { Finding } from "../finding.page-type.ts"

export const aSetThumbnailIsAnArbitrarySlotRatherThanArtChosenForTheSet = {
  id: "01a06140-ab88-7e63-880d-f81b1a83ddfb",
  pageTypeSlug: "finding",
  slug: "a-set-thumbnail-is-an-arbitrary-slot-rather-than-art-chosen-for-the-set",
  domainSlug: "domain/temper",
  claim:
    "A gear set's thumbnail in the set-select dialog is whichever icon slot sorts first rather than art chosen to represent the set. Of the 660 sets carrying icons, 509 share a thumbnail with at least one other set, only 255 distinct icons are drawn on, and 143 show the same generic Breton one-hand axe. The data cannot settle this: a set's icons are per-piece art and no field says which piece represents the set.",
  evidence:
    'temper/web/app/components/equipment/set-select-dialog.tsx renderIcon tries `icons["*"]`, `icons["weapon:*"]` and `icons["armor:*"]` and then falls through. No set carries any of those three keys, 0 of 707, so the fall-through is the only path every set takes. It now picks the alphabetically first slot, which is deterministic but arbitrary; before it picked whichever key the generated table listed first, which was arbitrary and order-dependent as well. After the sort, 660 sets show an icon drawn from 255 distinct ones, and 509 of those 660 share theirs. The most repeated is gear_breton_1haxe_d.dds on 143 sets, then gear_bosmer_1haxe_d.dds, gear_altmer_1haxe_d.dds and gear_celestial_1haxe_a.dds on 9 each, and gear_welkynar_axe_001.dds and gear_clandreamcarver_1haxe_a.dds on 8 each. The 143 are the crafted sets, which all wear Breton motif art on their weapons, so sorting by slot name hands every one of them the same axe. Nothing in the pages answers which piece should represent a set: `icons` is a slot-to-art table declared at akasha/temper/temper-catalog/temper-gear/properties/icons.page-property-entry.ts and it carries no mark of preference. The three wildcard keys the dialog tries are not lost data. `EquipmentPattern` is one type serving two vocabularies: `valid` does use `*`, `*:light`, `*:medium` and `*:heavy`, while `icons` has never carried a bare wildcard in any version of the generated file. 47 further sets carry no icons at all and show a shield.',
} as const satisfies Finding
