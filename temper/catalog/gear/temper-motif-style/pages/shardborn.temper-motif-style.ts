import type { TemperMotifStyle } from "akasha/temper/catalog/gear/temper-motif-style/temper-motif-style.page-type.types.ts"

export const shardborn = {
  id: "019e5a46-c4c5-786a-8bc5-de893e45d956",
  type: "page-type/temper-motif-style",
  slug: "shardborn",
  title: "Shardborn",
  collectionIndex: 110,
  sourceDescription: "Delve/WB dailies (Gold Road)",
  dropSources: [
    "temper-scribing-source/dlc-delve-dailies",
    "temper-scribing-source/dlc-world-boss-dailies",
  ],
} as const satisfies TemperMotifStyle
