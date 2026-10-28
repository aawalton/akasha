import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const pendingRollTrialPlayer = {
  id: "01a183cf-b828-7765-9360-8e8646f39f36",
  type: "page-type/metric-character-health",
  slug: "pending-roll-trial-player",
  character: "character-player/pending-roll-trial-player",
  value: 21,
  minValue: 0,
  maxValue: 24,
  displayOrder: 1,
  createdAt: "2026-10-28T18:39:53.794Z",
  updatedAt: "2026-10-28T18:39:53.794Z",
} as const satisfies MetricCharacterHealth
