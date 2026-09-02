import type { TemperMotifStyle } from "../temper-motif-style.page-type.ts"

export const shardborn = {
  id: "01a05fd7-41eb-78a3-8cf1-a4e42c3d071b",
  pageTypeSlug: "temper-motif-style",
  slug: "shardborn",
  title: "Shardborn",
  collectionIndex: 110,
  sourceDescription: "Delve/WB dailies (Gold Road)",
  dropSources: ["dlc-delve-dailies", "dlc-world-boss-dailies"],
} as const satisfies TemperMotifStyle
