import type { TemperMotifStyle } from "akasha/temper/catalog/gear/temper-motif-style/temper-motif-style.page-type.types.ts"

export const arkthzandArmory = {
  id: "019e5a46-c46e-7f85-8967-30912a6624c6",
  type: "page-type/temper-motif-style",
  slug: "arkthzand-armory",
  title: "Arkthzand Armory",
  collectionIndex: 81,
  sourceDescription: "WB/Delve dailies (The Reach)",
  dropSources: [
    "temper-scribing-source/dlc-delve-dailies",
    "temper-scribing-source/dlc-world-boss-dailies",
  ],
} as const satisfies TemperMotifStyle
