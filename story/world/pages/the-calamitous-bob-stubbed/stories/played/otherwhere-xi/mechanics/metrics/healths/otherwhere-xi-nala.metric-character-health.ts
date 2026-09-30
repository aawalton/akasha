import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const otherwhereXiNala = {
  id: "01a0ea7f-cf5b-7e9b-8ca2-61f6a038955f",
  type: "page-type/metric-character-health",
  slug: "otherwhere-xi-nala",
  character: "character-player/otherwhere-xi-nala",
  value: 38,
  minValue: 0,
  maxValue: 38,
  history: "jsonl",
  displayOrder: 1,
  unrevealed: true,
} as const satisfies MetricCharacterHealth
