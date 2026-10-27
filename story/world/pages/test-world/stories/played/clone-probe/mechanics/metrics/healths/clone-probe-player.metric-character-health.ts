import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const cloneProbePlayer = {
  id: "01a17f4c-d936-705d-ac4a-4d521b4b0868",
  type: "page-type/metric-character-health",
  slug: "clone-probe-player",
  character: "character-player/clone-probe-player",
  value: 24,
  minValue: 0,
  maxValue: 24,
  displayOrder: 1,
  createdAt: "2026-10-27T21:38:27.218Z",
  updatedAt: "2026-10-27T21:38:27.218Z",
} as const satisfies MetricCharacterHealth
