import type { TemperMotifStyle } from "akasha/temper/catalog/gear/temper-motif-style/temper-motif-style.page-type.types.ts"

export const deadKeeper = {
  id: "019e5a46-c4b9-76dd-862a-8a73e36a670b",
  type: "page-type/temper-motif-style",
  slug: "dead-keeper",
  title: "Dead Keeper",
  collectionIndex: 106,
  sourceDescription: "Delve/WB dailies (Necrom)",
  dropSources: [
    "temper-scribing-source/dlc-delve-dailies",
    "temper-scribing-source/dlc-world-boss-dailies",
  ],
} as const satisfies TemperMotifStyle
