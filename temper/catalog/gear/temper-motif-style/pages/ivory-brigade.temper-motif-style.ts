import type { TemperMotifStyle } from "akasha/temper/catalog/gear/temper-motif-style/temper-motif-style.page-type.types.ts"

export const ivoryBrigade = {
  id: "019e5a46-c484-7061-8f55-15105f5e78ff",
  type: "page-type/temper-motif-style",
  slug: "ivory-brigade",
  title: "Ivory Brigade",
  collectionIndex: 88,
  sourceDescription: "WB dailies (Blackwood)",
  dropSources: [
    "temper-scribing-source/dlc-delve-dailies",
    "temper-scribing-source/dlc-world-boss-dailies",
  ],
} as const satisfies TemperMotifStyle
