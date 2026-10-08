import type { MetricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.types.ts"

export const emberdeepNala = {
  id: "01a0fde6-9f8a-7f0b-a8ae-89073795e3a7",
  type: "page-type/metric-character-currency",
  slug: "emberdeep-nala",
  character: "character-player/emberdeep-nala",
  currency: "world-currency/emberdeep-coin",
  value: 3,
  history: "jsonl",
  minValue: 0,
  displayOrder: 1,
  unrevealed: false,
  createdAt: "2026-10-02T18:35:44.906Z",
  updatedAt: "2026-10-02T21:42:19.000Z",
} as const satisfies MetricCharacterCurrency
