import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const cloneProbePlayer = {
  id: "01a17f3e-4458-75ae-a7e7-934ec9098f0f",
  type: "page-type/metric-character-health",
  slug: "clone-probe-player",
  character: "character-player/clone-probe-player",
  value: 24,
  minValue: 0,
  maxValue: 24,
  displayOrder: 1,
  createdAt: "2026-10-27T21:22:31.272Z",
  updatedAt: "2026-10-27T21:22:31.272Z",
} as const satisfies MetricCharacterHealth
