import type { MetricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.types.ts"

export const skillLockProbePlayer = {
  id: "01a17ff8-9a7f-7f21-b8dc-228c322e9566",
  type: "page-type/metric-character-currency",
  slug: "skill-lock-probe-player",
  character: "character-player/skill-lock-probe-player",
  currency: "world-currency/skill-lock-probe-world-coin",
  value: 18,
  minValue: 0,
  createdAt: "2026-10-28T00:46:04.001Z",
  updatedAt: "2026-10-28T00:46:04.001Z",
} as const satisfies MetricCharacterCurrency
