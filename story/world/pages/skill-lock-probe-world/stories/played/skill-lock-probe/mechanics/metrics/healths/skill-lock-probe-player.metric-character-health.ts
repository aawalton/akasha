import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const skillLockProbePlayer = {
  id: "01a17ff8-9a7f-76ea-8e3b-9b3c06dea2d1",
  type: "page-type/metric-character-health",
  slug: "skill-lock-probe-player",
  character: "character-player/skill-lock-probe-player",
  value: 21,
  minValue: 0,
  maxValue: 24,
  displayOrder: 1,
  createdAt: "2026-10-28T00:46:04.001Z",
  updatedAt: "2026-10-28T00:46:04.001Z",
} as const satisfies MetricCharacterHealth
