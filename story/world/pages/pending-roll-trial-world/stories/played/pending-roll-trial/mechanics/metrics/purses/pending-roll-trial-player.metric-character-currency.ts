import type { MetricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.types.ts"

export const pendingRollTrialPlayer = {
  id: "01a183cf-b828-74bb-b093-3d7f83266bc0",
  type: "page-type/metric-character-currency",
  slug: "pending-roll-trial-player",
  character: "character-player/pending-roll-trial-player",
  currency: "world-currency/pending-roll-trial-world-coin",
  value: 18,
  minValue: 0,
  createdAt: "2026-10-28T18:39:53.794Z",
  updatedAt: "2026-10-28T18:39:53.794Z",
} as const satisfies MetricCharacterCurrency
