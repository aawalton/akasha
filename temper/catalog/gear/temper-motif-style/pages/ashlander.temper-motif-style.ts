import type { TemperMotifStyle } from "akasha/temper/catalog/gear/temper-motif-style/temper-motif-style.page-type.types.ts"

export const ashlander = {
  id: "019e5a46-c3f0-7f85-96ad-0f3980c6e24f",
  type: "page-type/temper-motif-style",
  slug: "ashlander",
  title: "Ashlander",
  collectionIndex: 36,
  sourceDescription: "Hunting/relic dailies (Vvardenfell)",
  dropSources: [
    "temper-scribing-source/dlc-delve-dailies",
    "temper-scribing-source/dlc-world-boss-dailies",
  ],
} as const satisfies TemperMotifStyle
