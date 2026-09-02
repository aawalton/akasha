import type { TemperMotifStyle } from "../temper-motif-style.page-type.ts"

export const draugr = {
  id: "01a05fd7-41da-7c2c-8ec8-822344e3ab03",
  pageTypeSlug: "temper-motif-style",
  slug: "draugr",
  title: "Draugr",
  collectionIndex: 23,
  sourceDescription: "FG/MG/Undaunted dailies (base game)",
  dropSources: ["mages-guild-daily", "fighters-guild-daily", "undaunted-delve-dailies"],
} as const satisfies TemperMotifStyle
