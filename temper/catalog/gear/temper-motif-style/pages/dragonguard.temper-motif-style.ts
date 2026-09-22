import type { TemperMotifStyle } from "akasha/temper/catalog/gear/temper-motif-style/temper-motif-style.page-type.types.ts"

export const dragonguard = {
  id: "019e5a46-c435-7d61-bc07-42819a4a8e63",
  type: "page-type/temper-motif-style",
  slug: "dragonguard",
  title: "Dragonguard",
  collectionIndex: 62,
  sourceDescription: "Dragon hunt/Delve dailies (Southern Elsweyr)",
  dropSources: [
    "temper-scribing-source/dlc-delve-dailies",
    "temper-scribing-source/dlc-world-boss-dailies",
    "temper-scribing-source/dlc-incursion-dailies",
  ],
} as const satisfies TemperMotifStyle
