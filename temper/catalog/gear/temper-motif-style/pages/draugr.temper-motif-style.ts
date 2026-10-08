import type { TemperMotifStyle } from "akasha/temper/catalog/gear/temper-motif-style/temper-motif-style.page-type.types.ts"

export const draugr = {
  id: "019e5a46-c3d7-7385-b3ff-c30448a6742a",
  type: "page-type/temper-motif-style",
  slug: "draugr",
  title: "Draugr",
  esoItemStyleId: 31,
  styleName: "Draugr",
  collectionIndex: 23,
  sourceDescription: "FG/MG/Undaunted dailies (base game)",
  dropSources: [
    "temper-scribing-source/mages-guild-daily",
    "temper-scribing-source/fighters-guild-daily",
    "temper-scribing-source/undaunted-delve-dailies",
  ],
  createdAt: "2026-05-24T13:57:27.639Z",
  updatedAt: "2026-09-27T12:44:07.000Z",
} as const satisfies TemperMotifStyle
