import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const otherwhereIAlan = {
  id: "01a0e363-036f-742d-80d8-7671ecb20c8a",
  type: "page-type/metric-character-health",
  slug: "otherwhere-i-alan",
  character: "character-player/otherwhere-i-alan",
  value: 20,
  minValue: 0,
  maxValue: 20,
  history: "jsonl",
  displayOrder: 1,
  createdAt: "2026-09-27T15:01:52.111Z",
  updatedAt: "2026-09-30T11:17:00.000Z",
} as const satisfies MetricCharacterHealth
