import type { TemperMotifStyle } from "akasha/temper/catalog/gear/temper-motif-style/temper-motif-style.page-type.types.ts"

export const shieldOfSenchal = {
  id: "019e5a46-c441-72e8-9c91-d0653df36b69",
  type: "page-type/temper-motif-style",
  slug: "shield-of-senchal",
  title: "Shield of Senchal",
  esoItemStyleId: 95,
  styleName: "Shield of Senchal",
  collectionIndex: 66,
  sourceDescription: "Dailies in Senchal (Southern Elsweyr)",
  dropSources: [
    "temper-scribing-source/dlc-delve-dailies",
    "temper-scribing-source/dlc-world-boss-dailies",
  ],
  createdAt: "2026-05-24T13:57:27.745Z",
  updatedAt: "2026-09-27T16:48:11.000Z",
} as const satisfies TemperMotifStyle
