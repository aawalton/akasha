import type { MetricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.types.ts"

export const overwhereINala = {
  id: "01a0ed2d-5d9b-77b5-b8ef-f475043a0f3c",
  type: "page-type/metric-character-currency",
  slug: "overwhere-i-nala",
  character: "character-player/overwhere-i-nala",
  currency: "world-currency/overwhere-i-coin",
  value: 111,
  minValue: 0,
  history: "jsonl",
  displayOrder: 9,
  unrevealed: false,
} as const satisfies MetricCharacterCurrency
