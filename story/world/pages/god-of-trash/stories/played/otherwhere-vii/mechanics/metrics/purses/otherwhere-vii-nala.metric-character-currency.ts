import type { MetricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.types.ts"

export const otherwhereViiNala = {
  id: "01a0ea37-18e3-77f8-a1b7-5bd6e6feb283",
  type: "page-type/metric-character-currency",
  slug: "otherwhere-vii-nala",
  character: "character-player/otherwhere-vii-nala",
  currency: "world-currency/otherwhere-vii-coin",
  value: 0,
  minValue: 0,
  history: "jsonl",
  displayOrder: 3,
  unrevealed: true,
} as const satisfies MetricCharacterCurrency
