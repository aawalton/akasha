import type { TemperMotifStyle } from "akasha/temper/catalog/gear/temper-motif-style/temper-motif-style.page-type.types.ts"

export const moragTong = {
  id: "019e5a46-c3bd-7815-b1c9-1d043f131ac4",
  type: "page-type/temper-motif-style",
  slug: "morag-tong",
  title: "Morag Tong",
  collectionIndex: 13,
  sourceDescription: "Hall of Justice dailies (Vvardenfell)",
  dropSources: [
    "temper-scribing-source/dlc-delve-dailies",
    "temper-scribing-source/dlc-world-boss-dailies",
  ],
} as const satisfies TemperMotifStyle
