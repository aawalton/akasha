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
} as const satisfies MetricCharacterHealth
