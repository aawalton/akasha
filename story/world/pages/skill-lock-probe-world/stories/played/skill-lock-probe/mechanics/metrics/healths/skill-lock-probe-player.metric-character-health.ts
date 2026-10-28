import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const skillLockProbePlayer = {
  id: "01a17ff2-6f78-7a6d-b44f-69991800669c",
  type: "page-type/metric-character-health",
  slug: "skill-lock-probe-player",
  character: "character-player/skill-lock-probe-player",
  value: 21,
  minValue: 0,
  maxValue: 24,
  displayOrder: 1,
  createdAt: "2026-10-28T00:39:19.516Z",
  updatedAt: "2026-10-28T00:39:19.516Z",
} as const satisfies MetricCharacterHealth
