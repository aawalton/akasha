import type { TemperMotifStyle } from "akasha/temper/catalog/gear/temper-motif-style/temper-motif-style.page-type.types.ts"

export const anequina = {
  id: "019e5a46-c42d-738c-8b4f-d8040ad1285a",
  type: "page-type/temper-motif-style",
  slug: "anequina",
  title: "Anequina",
  esoItemStyleId: 84,
  styleName: "Anequina",
  collectionIndex: 59,
  sourceDescription: "World Boss/Delve dailies (Northern Elsweyr)",
  dropSources: [
    "temper-scribing-source/dlc-delve-dailies",
    "temper-scribing-source/dlc-world-boss-dailies",
    "temper-scribing-source/dlc-incursion-dailies",
  ],
  createdAt: "2026-05-24T13:57:27.725Z",
  updatedAt: "2026-09-27T16:46:52.000Z",
} as const satisfies TemperMotifStyle
