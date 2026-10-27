import type { MetricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.types.ts"

export const cloneProbePlayer = {
  id: "01a17f3e-4458-7414-850a-f8747dd36c60",
  type: "page-type/metric-character-currency",
  slug: "clone-probe-player",
  character: "character-player/clone-probe-player",
  currency: "world-currency/test-world-coin",
  value: 9,
  minValue: 0,
  createdAt: "2026-10-27T21:22:31.272Z",
  updatedAt: "2026-10-27T21:22:31.272Z",
} as const satisfies MetricCharacterCurrency
