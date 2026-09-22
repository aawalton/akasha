import type { TemperMotifStyle } from "akasha/temper/catalog/gear/temper-motif-style/temper-motif-style.page-type.types.ts"

export const blackreachVanguard = {
  id: "019e5a46-c44a-7266-8952-4262d00dd907",
  type: "page-type/temper-motif-style",
  slug: "blackreach-vanguard",
  title: "Blackreach Vanguard",
  collectionIndex: 69,
  sourceDescription: "Delve/WB dailies (Western Skyrim)",
  dropSources: [
    "temper-scribing-source/dlc-delve-dailies",
    "temper-scribing-source/dlc-world-boss-dailies",
  ],
} as const satisfies TemperMotifStyle
