import type { TemperMotifStyle } from "akasha/temper/catalog/gear/temper-motif-style/temper-motif-style.page-type.types.ts"

export const apostle = {
  id: "019e5a46-c401-7158-a634-088df9f46b40",
  type: "page-type/temper-motif-style",
  slug: "apostle",
  title: "Apostle",
  esoItemStyleId: 65,
  styleName: "Apostle",
  collectionIndex: 42,
  sourceDescription: "Dailies (Clockwork City)",
  dropSources: [
    "temper-scribing-source/dlc-delve-dailies",
    "temper-scribing-source/dlc-world-boss-dailies",
  ],
  createdAt: "2026-05-24T13:57:27.681Z",
  updatedAt: "2026-09-27T16:44:16.000Z",
} as const satisfies TemperMotifStyle
