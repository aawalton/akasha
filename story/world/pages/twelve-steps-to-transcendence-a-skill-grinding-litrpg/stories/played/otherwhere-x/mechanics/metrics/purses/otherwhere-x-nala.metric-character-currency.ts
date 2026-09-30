import type { MetricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.types.ts"

export const otherwhereXNala = {
  id: "01a0ea77-ca09-7b67-a42d-b74985bf9fcc",
  type: "page-type/metric-character-currency",
  slug: "otherwhere-x-nala",
  character: "character-player/otherwhere-x-nala",
  currency: "world-currency/otherwhere-x-coin",
  value: 3,
  minValue: 0,
  history: "jsonl",
  displayOrder: 3,
} as const satisfies MetricCharacterCurrency
