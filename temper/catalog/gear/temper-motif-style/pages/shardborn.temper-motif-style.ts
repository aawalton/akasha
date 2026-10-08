import type { TemperMotifStyle } from "akasha/temper/catalog/gear/temper-motif-style/temper-motif-style.page-type.types.ts"

export const shardborn = {
  id: "019e5a46-c4c5-786a-8bc5-de893e45d956",
  type: "page-type/temper-motif-style",
  slug: "shardborn",
  title: "Shardborn",
  esoItemStyleId: 147,
  styleName: "Shardborn",
  collectionIndex: 110,
  sourceDescription: "Delve/WB dailies (Gold Road)",
  dropSources: [
    "temper-scribing-source/dlc-delve-dailies",
    "temper-scribing-source/dlc-world-boss-dailies",
  ],
  createdAt: "2026-05-24T13:57:27.877Z",
  updatedAt: "2026-09-27T16:56:27.000Z",
} as const satisfies TemperMotifStyle
