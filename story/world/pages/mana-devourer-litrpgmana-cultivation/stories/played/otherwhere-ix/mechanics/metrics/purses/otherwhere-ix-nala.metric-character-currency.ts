import type { MetricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.types.ts"

export const otherwhereIxNala = {
  id: "01a0ea39-98fd-70d7-a331-a6d74a5cea67",
  type: "page-type/metric-character-currency",
  slug: "otherwhere-ix-nala",
  character: "character-player/otherwhere-ix-nala",
  currency: "world-currency/otherwhere-ix-coin",
  value: 0,
  minValue: 0,
  history: "jsonl",
  displayOrder: 4,
  unrevealed: true,
} as const satisfies MetricCharacterCurrency
