import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const probeTwoPlayer = {
  id: "01a17fbf-aff5-7a61-b7b0-2139959d5ea4",
  type: "page-type/metric-character-health",
  slug: "probe-two-player",
  character: "character-player/probe-two-player",
  value: 21,
  minValue: 0,
  maxValue: 24,
  displayOrder: 1,
  createdAt: "2026-10-27T23:43:53.894Z",
  updatedAt: "2026-10-27T23:43:53.894Z",
} as const satisfies MetricCharacterHealth
