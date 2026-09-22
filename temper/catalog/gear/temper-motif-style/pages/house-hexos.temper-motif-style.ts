import type { TemperMotifStyle } from "akasha/temper/catalog/gear/temper-motif-style/temper-motif-style.page-type.types.ts"

export const houseHexos = {
  id: "019e5a46-c474-7a1a-a212-f68cd026535f",
  type: "page-type/temper-motif-style",
  slug: "house-hexos",
  title: "House Hexos",
  collectionIndex: 83,
  sourceDescription: "Delve dailies (Deadlands/Fargrave)",
  dropSources: [
    "temper-scribing-source/dlc-delve-dailies",
    "temper-scribing-source/dlc-world-boss-dailies",
  ],
} as const satisfies TemperMotifStyle
