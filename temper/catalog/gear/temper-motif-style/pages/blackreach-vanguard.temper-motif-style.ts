import type { TemperMotifStyle } from "akasha/temper/catalog/gear/temper-motif-style/temper-motif-style.page-type.types.ts"

export const blackreachVanguard = {
  id: "019e5a46-c44a-7266-8952-4262d00dd907",
  type: "page-type/temper-motif-style",
  slug: "blackreach-vanguard",
  title: "Blackreach Vanguard",
  esoItemStyleId: 100,
  styleName: "Blackreach Vanguard",
  collectionIndex: 69,
  sourceDescription: "Delve/WB dailies (Western Skyrim)",
  dropSources: [
    "temper-scribing-source/dlc-delve-dailies",
    "temper-scribing-source/dlc-world-boss-dailies",
  ],
  createdAt: "2026-05-24T13:57:27.754Z",
  updatedAt: "2026-09-27T16:48:46.000Z",
} as const satisfies TemperMotifStyle
