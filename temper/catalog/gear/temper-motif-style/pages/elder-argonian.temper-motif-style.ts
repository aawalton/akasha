import type { TemperMotifStyle } from "akasha/temper/catalog/gear/temper-motif-style/temper-motif-style.page-type.types.ts"

export const elderArgonian = {
  id: "019e5a46-c424-7b51-a65e-ce8306f57651",
  type: "page-type/temper-motif-style",
  slug: "elder-argonian",
  title: "Elder Argonian",
  collectionIndex: 56,
  sourceDescription: "Dailies (Murkmire)",
  dropSources: [
    "temper-scribing-source/dlc-delve-dailies",
    "temper-scribing-source/dlc-world-boss-dailies",
  ],
} as const satisfies TemperMotifStyle
