import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const memoCheckPlayer = {
  id: "01a1832d-38c0-725d-83d5-7614685a1197",
  type: "page-type/metric-character-health",
  slug: "memo-check-player",
  character: "character-player/memo-check-player",
  value: 21,
  minValue: 0,
  maxValue: 24,
  displayOrder: 1,
  createdAt: "2026-10-28T15:42:23.600Z",
  updatedAt: "2026-10-28T15:42:23.600Z",
} as const satisfies MetricCharacterHealth
