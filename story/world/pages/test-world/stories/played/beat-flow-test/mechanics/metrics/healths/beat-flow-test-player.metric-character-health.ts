import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const beatFlowTestPlayer = {
  id: "01a17f7f-6e81-7630-8fc5-10242db7d7d4",
  type: "page-type/metric-character-health",
  slug: "beat-flow-test-player",
  character: "character-player/beat-flow-test-player",
  value: 24,
  minValue: 0,
  maxValue: 24,
  displayOrder: 1,
  createdAt: "2026-10-27T22:33:42.090Z",
  updatedAt: "2026-10-27T22:33:42.090Z",
} as const satisfies MetricCharacterHealth
