import type { TemperMotifStyle } from "akasha/temper/catalog/gear/temper-motif-style/temper-motif-style.page-type.types.ts"

export const apostle = {
  id: "019e5a46-c401-7158-a634-088df9f46b40",
  type: "page-type/temper-motif-style",
  slug: "apostle",
  title: "Apostle",
  collectionIndex: 42,
  sourceDescription: "Dailies (Clockwork City)",
  dropSources: [
    "temper-scribing-source/dlc-delve-dailies",
    "temper-scribing-source/dlc-world-boss-dailies",
  ],
} as const satisfies TemperMotifStyle
