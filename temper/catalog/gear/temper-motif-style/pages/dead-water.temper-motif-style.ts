import type { TemperMotifStyle } from "akasha/temper/catalog/gear/temper-motif-style/temper-motif-style.page-type.types.ts"

export const deadWater = {
  id: "019e5a46-c422-70ff-b950-b612bc55960a",
  type: "page-type/temper-motif-style",
  slug: "dead-water",
  title: "Dead-Water",
  collectionIndex: 55,
  sourceDescription: "Dailies (Murkmire)",
  dropSources: [
    "temper-scribing-source/dlc-delve-dailies",
    "temper-scribing-source/dlc-world-boss-dailies",
  ],
} as const satisfies TemperMotifStyle
