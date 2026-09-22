import type { TemperMotifStyle } from "akasha/temper/catalog/gear/temper-motif-style/temper-motif-style.page-type.types.ts"

export const greymoor = {
  id: "019e5a46-c44d-734a-ae2f-108d0591d598",
  type: "page-type/temper-motif-style",
  slug: "greymoor",
  title: "Greymoor",
  collectionIndex: 70,
  sourceDescription: "Harrowstorm dailies (Western Skyrim)",
  dropSources: [
    "temper-scribing-source/dlc-delve-dailies",
    "temper-scribing-source/dlc-world-boss-dailies",
    "temper-scribing-source/dlc-incursion-dailies",
  ],
} as const satisfies TemperMotifStyle
