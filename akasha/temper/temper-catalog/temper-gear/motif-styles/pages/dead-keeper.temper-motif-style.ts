import type { TemperMotifStyle } from "../temper-motif-style.page-type.ts"

export const deadKeeper = {
  id: "019e5a46-c4b9-76dd-862a-8a73e36a670b",
  pageTypeSlug: "temper-motif-style",
  slug: "dead-keeper",
  title: "Dead Keeper",
  collectionIndex: 106,
  sourceDescription: "Delve/WB dailies (Necrom)",
  dropSources: ["dlc-delve-dailies", "dlc-world-boss-dailies"],
} as const satisfies TemperMotifStyle
