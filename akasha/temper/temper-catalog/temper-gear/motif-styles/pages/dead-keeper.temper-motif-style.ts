import type { TemperMotifStyle } from "../temper-motif-style.page-type.ts"

export const deadKeeper = {
  id: "01a05fd7-41d9-746f-8d1e-ec0288418de0",
  pageTypeSlug: "temper-motif-style",
  slug: "dead-keeper",
  title: "Dead Keeper",
  collectionIndex: 106,
  sourceDescription: "Delve/WB dailies (Necrom)",
  dropSources: ["dlc-delve-dailies", "dlc-world-boss-dailies"],
} as const satisfies TemperMotifStyle
