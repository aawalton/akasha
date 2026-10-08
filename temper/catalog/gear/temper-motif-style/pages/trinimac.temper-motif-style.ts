import type { TemperMotifStyle } from "akasha/temper/catalog/gear/temper-motif-style/temper-motif-style.page-type.types.ts"

export const trinimac = {
  id: "019e5a46-c3b8-7505-aeb9-66bc38b0d942",
  type: "page-type/temper-motif-style",
  slug: "trinimac",
  title: "Trinimac",
  esoItemStyleId: 21,
  styleName: "Trinimac",
  collectionIndex: 11,
  sourceDescription: "Delve dailies from Guruzug (Orsinium)",
  dropSources: [
    "temper-scribing-source/dlc-delve-dailies",
    "temper-scribing-source/dlc-world-boss-dailies",
  ],
  createdAt: "2026-05-24T13:57:27.608Z",
  updatedAt: "2026-09-27T12:43:55.000Z",
} as const satisfies TemperMotifStyle
