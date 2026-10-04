import type { MetricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.types.ts"

export const fairweatherElsie = {
  id: "01a102af-305c-7b0f-8e6f-386f3c68682f",
  type: "page-type/metric-character-currency",
  slug: "fairweather-elsie",
  character: "character-player/fairweather-elsie",
  currency: "world-currency/fairweather-coin",
  value: 106,
  minValue: 0,
  history: "jsonl",
  displayOrder: 1,
  unrevealed: false,
} as const satisfies MetricCharacterCurrency
