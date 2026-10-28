import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const pathsProbePlayer = {
  id: "01a18008-7533-7ff1-8dd8-ac5f41d8f85a",
  type: "page-type/metric-character-health",
  slug: "paths-probe-player",
  character: "character-player/paths-probe-player",
  value: 21,
  minValue: 0,
  maxValue: 24,
  displayOrder: 1,
  createdAt: "2026-10-28T01:03:22.622Z",
  updatedAt: "2026-10-28T01:03:22.622Z",
} as const satisfies MetricCharacterHealth
