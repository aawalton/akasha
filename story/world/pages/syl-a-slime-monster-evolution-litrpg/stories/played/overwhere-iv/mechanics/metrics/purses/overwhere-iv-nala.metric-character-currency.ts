import type { MetricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.types.ts"

export const overwhereIvNala = {
  id: "01a0ed22-eab7-7cee-9f75-64a14a1651c2",
  type: "page-type/metric-character-currency",
  slug: "overwhere-iv-nala",
  character: "character-player/overwhere-iv-nala",
  currency: "world-currency/overwhere-iv-coin",
  value: 175,
  minValue: 0,
  history: "jsonl",
  displayOrder: 4,
  unrevealed: true,
} as const satisfies MetricCharacterCurrency
