import type { MetricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.types.ts"

export const probeTwoPlayer = {
  id: "01a17fbf-aff5-7a82-8acf-5b4189f43747",
  type: "page-type/metric-character-currency",
  slug: "probe-two-player",
  character: "character-player/probe-two-player",
  currency: "world-currency/probe-two-world-coin",
  value: 24,
  minValue: 0,
  createdAt: "2026-10-27T23:43:53.894Z",
  updatedAt: "2026-10-27T23:43:53.894Z",
} as const satisfies MetricCharacterCurrency
