import type { MetricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.types.ts"

export const otherwhereViiiNala = {
  id: "01a0ea43-f6ee-750f-b574-9f1448c9d2df",
  type: "page-type/metric-character-currency",
  slug: "otherwhere-viii-nala",
  character: "character-player/otherwhere-viii-nala",
  currency: "world-currency/otherwhere-viii-coin",
  value: 0,
  minValue: 0,
  history: "jsonl",
  displayOrder: 3,
  unrevealed: true,
} as const satisfies MetricCharacterCurrency
