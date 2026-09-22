import type { TemperMotifStyle } from "akasha/temper/catalog/gear/temper-motif-style/temper-motif-style.page-type.types.ts"

export const firesong = {
  id: "019e5a46-c4aa-77ed-98d5-24d3daa03b44",
  type: "page-type/temper-motif-style",
  slug: "firesong",
  title: "Firesong",
  collectionIndex: 101,
  sourceDescription: "Volcanic Vent/dailies (Galen)",
  dropSources: [
    "temper-scribing-source/dlc-delve-dailies",
    "temper-scribing-source/dlc-world-boss-dailies",
    "temper-scribing-source/dlc-incursion-dailies",
  ],
} as const satisfies TemperMotifStyle
