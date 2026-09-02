import type { TemperMotifStyle } from "../temper-motif-style.page-type.ts"

export const deadWater = {
  id: "01a05fd7-41da-7a37-984a-7532c3576f61",
  pageTypeSlug: "temper-motif-style",
  slug: "dead-water",
  title: "Dead-Water",
  collectionIndex: 55,
  sourceDescription: "Dailies (Murkmire)",
  dropSources: ["dlc-delve-dailies", "dlc-world-boss-dailies"],
} as const satisfies TemperMotifStyle
