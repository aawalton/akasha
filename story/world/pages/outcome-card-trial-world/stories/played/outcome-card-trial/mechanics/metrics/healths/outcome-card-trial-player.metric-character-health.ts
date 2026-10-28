import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const outcomeCardTrialPlayer = {
  id: "01a183ae-dc71-7441-a9f6-9e95b1fd0af2",
  type: "page-type/metric-character-health",
  slug: "outcome-card-trial-player",
  character: "character-player/outcome-card-trial-player",
  value: 21,
  minValue: 0,
  maxValue: 24,
  displayOrder: 1,
  createdAt: "2026-10-28T18:03:59.696Z",
  updatedAt: "2026-10-28T18:03:59.696Z",
} as const satisfies MetricCharacterHealth
