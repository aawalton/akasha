import type { MetricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.types.ts"

export const memoCheckPlayer = {
  id: "01a1832d-38c0-79f0-832e-4736bb83a0e4",
  type: "page-type/metric-character-currency",
  slug: "memo-check-player",
  character: "character-player/memo-check-player",
  currency: "world-currency/memo-check-world-coin",
  value: 18,
  minValue: 0,
  createdAt: "2026-10-28T15:42:23.600Z",
  updatedAt: "2026-10-28T15:42:23.600Z",
} as const satisfies MetricCharacterCurrency
