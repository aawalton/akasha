import type { MetricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.types.ts"

export const cloneProbePlayer = {
  id: "01a17f4c-d936-71f2-bb79-788f51104286",
  type: "page-type/metric-character-currency",
  slug: "clone-probe-player",
  character: "character-player/clone-probe-player",
  currency: "world-currency/test-world-coin",
  value: 9,
  minValue: 0,
  createdAt: "2026-10-27T21:38:27.218Z",
  updatedAt: "2026-10-27T21:38:27.218Z",
} as const satisfies MetricCharacterCurrency
