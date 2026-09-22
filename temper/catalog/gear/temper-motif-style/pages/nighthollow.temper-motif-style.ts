import type { TemperMotifStyle } from "akasha/temper/catalog/gear/temper-motif-style/temper-motif-style.page-type.types.ts"

export const nighthollow = {
  id: "019e5a46-c46c-70f3-b49f-83f9887e1dae",
  type: "page-type/temper-motif-style",
  slug: "nighthollow",
  title: "Nighthollow",
  collectionIndex: 80,
  sourceDescription: "Harrowstorm dailies (The Reach)",
  dropSources: [
    "temper-scribing-source/dlc-delve-dailies",
    "temper-scribing-source/dlc-world-boss-dailies",
    "temper-scribing-source/dlc-incursion-dailies",
  ],
} as const satisfies TemperMotifStyle
