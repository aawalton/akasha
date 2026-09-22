import type { TemperMotifStyle } from "akasha/temper/catalog/gear/temper-motif-style/temper-motif-style.page-type.types.ts"

export const draugr = {
  id: "019e5a46-c3d7-7385-b3ff-c30448a6742a",
  type: "page-type/temper-motif-style",
  slug: "draugr",
  title: "Draugr",
  collectionIndex: 23,
  sourceDescription: "FG/MG/Undaunted dailies (base game)",
  dropSources: [
    "temper-scribing-source/mages-guild-daily",
    "temper-scribing-source/fighters-guild-daily",
    "temper-scribing-source/undaunted-delve-dailies",
  ],
} as const satisfies TemperMotifStyle
