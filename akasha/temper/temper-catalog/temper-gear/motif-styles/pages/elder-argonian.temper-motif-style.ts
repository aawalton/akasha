import type { TemperMotifStyle } from "../temper-motif-style.page-type.ts"

export const elderArgonian = {
  id: "01a05fd7-41de-7ce5-b6ad-4fd5d208f7d6",
  pageTypeSlug: "temper-motif-style",
  slug: "elder-argonian",
  title: "Elder Argonian",
  collectionIndex: 56,
  sourceDescription: "Dailies (Murkmire)",
  dropSources: ["dlc-delve-dailies", "dlc-world-boss-dailies"],
} as const satisfies TemperMotifStyle
