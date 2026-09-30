import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const otherwhereViWallowSow = {
  id: "01a0ea55-72cb-75b4-b186-f336df2710e9",
  type: "page-type/metric-character-health",
  slug: "otherwhere-vi-wallow-sow",
  title: "HP",
  character: "character-other/otherwhere-vi-wallow-sow",
  value: 38,
  minValue: 0,
  maxValue: 38,
  history: "jsonl",
} as const satisfies MetricCharacterHealth
