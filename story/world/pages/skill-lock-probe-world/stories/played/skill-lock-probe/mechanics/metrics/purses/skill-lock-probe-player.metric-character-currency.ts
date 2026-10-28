import type { MetricCharacterCurrency } from "akasha/story/world/mechanics/metrics/metric-character/currency/metric-character-currency.page-type.types.ts"

export const skillLockProbePlayer = {
  id: "01a17ff2-6f78-7e4a-8c75-80fc46369a5a",
  type: "page-type/metric-character-currency",
  slug: "skill-lock-probe-player",
  character: "character-player/skill-lock-probe-player",
  currency: "world-currency/skill-lock-probe-world-coin",
  value: 18,
  minValue: 0,
  createdAt: "2026-10-28T00:39:19.516Z",
  updatedAt: "2026-10-28T00:39:19.516Z",
} as const satisfies MetricCharacterCurrency
