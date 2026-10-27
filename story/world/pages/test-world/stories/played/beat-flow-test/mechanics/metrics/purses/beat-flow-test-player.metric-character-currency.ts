import type { MetricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.types.ts"

export const beatFlowTestPlayer = {
  id: "01a17f7f-6e81-7d3d-a54a-24812898c1f5",
  type: "page-type/metric-character-currency",
  slug: "beat-flow-test-player",
  character: "character-player/beat-flow-test-player",
  currency: "world-currency/test-world-coin",
  value: 39,
  minValue: 0,
  createdAt: "2026-10-27T22:33:42.090Z",
  updatedAt: "2026-10-27T22:33:42.090Z",
} as const satisfies MetricCharacterCurrency
