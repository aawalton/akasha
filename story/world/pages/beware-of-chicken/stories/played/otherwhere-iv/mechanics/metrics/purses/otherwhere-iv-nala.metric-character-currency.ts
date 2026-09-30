import type { MetricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.types.ts"

export const otherwhereIvNala = {
  id: "01a0e9f3-7c48-7611-9b45-6aabdfc19d1f",
  type: "page-type/metric-character-currency",
  slug: "otherwhere-iv-nala",
  character: "character-player/otherwhere-iv-nala",
  currency: "world-currency/otherwhere-iv-coin",
  value: 0,
  minValue: 0,
  history: "jsonl",
  displayOrder: 2,
  unrevealed: true,
} as const satisfies MetricCharacterCurrency
