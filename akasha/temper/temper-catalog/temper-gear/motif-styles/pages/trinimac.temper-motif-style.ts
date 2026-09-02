import type { TemperMotifStyle } from "../temper-motif-style.page-type.ts"

export const trinimac = {
  id: "01a05fd7-41ef-7c64-bed1-a18c729e51c3",
  pageTypeSlug: "temper-motif-style",
  slug: "trinimac",
  title: "Trinimac",
  collectionIndex: 11,
  sourceDescription: "Delve dailies from Guruzug (Orsinium)",
  dropSources: ["dlc-delve-dailies", "dlc-world-boss-dailies"],
} as const satisfies TemperMotifStyle
