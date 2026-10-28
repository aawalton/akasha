import type { MetricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.types.ts"

export const timeProbePlayer = {
  id: "01a1802d-b13e-7f6c-86d8-7cbcca806e36",
  type: "page-type/metric-character-currency",
  slug: "time-probe-player",
  character: "character-player/time-probe-player",
  currency: "world-currency/time-probe-world-coin",
  value: 18,
  minValue: 0,
  createdAt: "2026-10-28T01:44:02.797Z",
  updatedAt: "2026-10-28T01:44:02.797Z",
} as const satisfies MetricCharacterCurrency
