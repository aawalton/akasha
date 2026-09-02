import type { TemperMotifStyle } from "../temper-motif-style.page-type.ts"

export const malacath = {
  id: "01a05fd7-41e4-77e1-acf6-e2b8c238dd7c",
  pageTypeSlug: "temper-motif-style",
  slug: "malacath",
  title: "Malacath",
  collectionIndex: 12,
  sourceDescription: "World Boss dailies from Arzorag (Orsinium)",
  dropSources: ["dlc-delve-dailies", "dlc-world-boss-dailies"],
} as const satisfies TemperMotifStyle
