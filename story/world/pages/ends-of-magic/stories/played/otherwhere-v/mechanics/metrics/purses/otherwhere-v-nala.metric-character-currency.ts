import type { MetricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.types.ts"

export const otherwhereVNala = {
  id: "01a0e9ff-ce47-787d-a80e-43e65456d405",
  type: "page-type/metric-character-currency",
  slug: "otherwhere-v-nala",
  character: "character-player/otherwhere-v-nala",
  currency: "world-currency/otherwhere-v-coin",
  value: 0,
  minValue: 0,
  history: "jsonl",
  displayOrder: 2,
} as const satisfies MetricCharacterCurrency
