import type { MetricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.types.ts"

export const otherwhereViNala = {
  id: "01a0ea47-1667-71de-8733-76fa4d90c42c",
  type: "page-type/metric-character-currency",
  slug: "otherwhere-vi-nala",
  character: "character-player/otherwhere-vi-nala",
  currency: "world-currency/otherwhere-vi-coin",
  value: 0,
  minValue: 0,
  history: "jsonl",
  displayOrder: 4,
  unrevealed: true,
} as const satisfies MetricCharacterCurrency
