import type { TemperMotifStyle } from "../temper-motif-style.page-type.ts"

export const dragonguard = {
  id: "01a05fd7-41da-7eb9-aabf-2b966b22002b",
  pageTypeSlug: "temper-motif-style",
  slug: "dragonguard",
  title: "Dragonguard",
  collectionIndex: 62,
  sourceDescription: "Dragon hunt/Delve dailies (Southern Elsweyr)",
  dropSources: ["dlc-delve-dailies", "dlc-world-boss-dailies", "dlc-incursion-dailies"],
} as const satisfies TemperMotifStyle
