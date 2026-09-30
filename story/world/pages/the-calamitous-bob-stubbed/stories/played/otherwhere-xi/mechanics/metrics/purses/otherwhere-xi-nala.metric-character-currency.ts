import type { MetricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.types.ts"

export const otherwhereXiNala = {
  id: "01a0ea7f-cf5b-7711-860d-09de3388cbd0",
  type: "page-type/metric-character-currency",
  slug: "otherwhere-xi-nala",
  character: "character-player/otherwhere-xi-nala",
  currency: "world-currency/otherwhere-xi-coin",
  value: 0,
  minValue: 0,
  history: "jsonl",
  displayOrder: 3,
  unrevealed: true,
} as const satisfies MetricCharacterCurrency
