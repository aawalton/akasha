import type { MetricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.types.ts"

export const emberdeepNala = {
  id: "01a0fde6-9f8a-7f0b-a8ae-89073795e3a7",
  type: "page-type/metric-character-currency",
  slug: "emberdeep-nala",
  character: "character-player/emberdeep-nala",
  currency: "world-currency/emberdeep-coin",
  value: 4,
  history: "jsonl",
  minValue: 0,
  displayOrder: 1,
  unrevealed: false,
} as const satisfies MetricCharacterCurrency
