import type { MetricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.types.ts"

export const otherwhereIAlan = {
  id: "01a0e363-5bac-748a-b101-1da77aa50044",
  type: "page-type/metric-character-currency",
  slug: "otherwhere-i-alan",
  character: "character-player/otherwhere-i-alan",
  currency: "world-currency/otherwhere-i-library-currency",
  value: 0,
  minValue: 0,
  history: "jsonl",
  displayOrder: 3,
} as const satisfies MetricCharacterCurrency
