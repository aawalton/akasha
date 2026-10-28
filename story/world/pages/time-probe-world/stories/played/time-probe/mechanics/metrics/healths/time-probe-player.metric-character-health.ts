import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const timeProbePlayer = {
  id: "01a1802d-b13e-797d-888a-6485a95fd05b",
  type: "page-type/metric-character-health",
  slug: "time-probe-player",
  character: "character-player/time-probe-player",
  value: 21,
  minValue: 0,
  maxValue: 24,
  displayOrder: 1,
  createdAt: "2026-10-28T01:44:02.797Z",
  updatedAt: "2026-10-28T01:44:02.797Z",
} as const satisfies MetricCharacterHealth
