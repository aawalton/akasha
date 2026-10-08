import type { TemperMotifStyle } from "akasha/temper/catalog/gear/temper-motif-style/temper-motif-style.page-type.types.ts"

export const pellitine = {
  id: "019e5a46-c42f-7e7b-b4fb-ce8005b5c97c",
  type: "page-type/temper-motif-style",
  slug: "pellitine",
  title: "Pellitine",
  esoItemStyleId: 85,
  styleName: "Pellitine",
  collectionIndex: 60,
  sourceDescription: "Dragon Hunt dailies (Northern Elsweyr)",
  dropSources: [
    "temper-scribing-source/dlc-delve-dailies",
    "temper-scribing-source/dlc-world-boss-dailies",
    "temper-scribing-source/dlc-incursion-dailies",
  ],
  createdAt: "2026-05-24T13:57:27.727Z",
  updatedAt: "2026-09-27T16:47:06.000Z",
} as const satisfies TemperMotifStyle
