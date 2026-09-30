import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const otherwhereIiNala = {
  id: "01a0e999-2dfe-72f5-95b0-c09aed082b1f",
  type: "page-type/metric-character-health",
  slug: "otherwhere-ii-nala",
  character: "character-player/otherwhere-ii-nala",
  value: 0,
  minValue: 0,
  maxValue: 18,
  history: "jsonl",
  displayOrder: 1,
} as const satisfies MetricCharacterHealth
