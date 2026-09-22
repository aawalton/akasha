import type { TemperMotifStyle } from "akasha/temper/catalog/gear/temper-motif-style/temper-motif-style.page-type.types.ts"

export const houseMornard = {
  id: "019e5a46-c4ad-7993-9059-23f36d4dab3b",
  type: "page-type/temper-motif-style",
  slug: "house-mornard",
  title: "House Mornard",
  collectionIndex: 102,
  sourceDescription: "WB/Delve dailies (Galen)",
  dropSources: [
    "temper-scribing-source/dlc-delve-dailies",
    "temper-scribing-source/dlc-world-boss-dailies",
  ],
} as const satisfies TemperMotifStyle
