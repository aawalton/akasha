import type { TemperMotifStyle } from "../temper-motif-style.page-type.ts"

export const firesong = {
  id: "01a05fd7-41df-73bc-9427-ed82a3d865db",
  pageTypeSlug: "temper-motif-style",
  slug: "firesong",
  title: "Firesong",
  collectionIndex: 101,
  sourceDescription: "Volcanic Vent/dailies (Galen)",
  dropSources: ["dlc-delve-dailies", "dlc-world-boss-dailies", "dlc-incursion-dailies"],
} as const satisfies TemperMotifStyle
