import type { MetricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.types.ts"

export const outcomeCardTrialPlayer = {
  id: "01a183ae-dc71-707c-9071-b2baed35baca",
  type: "page-type/metric-character-currency",
  slug: "outcome-card-trial-player",
  character: "character-player/outcome-card-trial-player",
  currency: "world-currency/outcome-card-trial-world-coin",
  value: 18,
  minValue: 0,
  createdAt: "2026-10-28T18:03:59.696Z",
  updatedAt: "2026-10-28T18:03:59.696Z",
} as const satisfies MetricCharacterCurrency
