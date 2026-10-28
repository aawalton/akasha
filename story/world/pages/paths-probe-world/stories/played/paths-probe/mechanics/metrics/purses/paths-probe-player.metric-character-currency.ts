import type { MetricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.types.ts"

export const pathsProbePlayer = {
  id: "01a18008-7533-7405-880e-6a61a9735da8",
  type: "page-type/metric-character-currency",
  slug: "paths-probe-player",
  character: "character-player/paths-probe-player",
  currency: "world-currency/paths-probe-world-coin",
  value: 18,
  minValue: 0,
  createdAt: "2026-10-28T01:03:22.622Z",
  updatedAt: "2026-10-28T01:03:22.622Z",
} as const satisfies MetricCharacterCurrency
