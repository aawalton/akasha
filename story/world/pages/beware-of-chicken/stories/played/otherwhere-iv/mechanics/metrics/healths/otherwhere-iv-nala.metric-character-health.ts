import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const otherwhereIvNala = {
  id: "01a0e9f8-2aac-7d30-975a-113b3a26385c",
  type: "page-type/metric-character-health",
  slug: "otherwhere-iv-nala",
  character: "character-player/otherwhere-iv-nala",
  value: 20,
  minValue: 0,
  maxValue: 20,
  history: "jsonl",
  displayOrder: 1,
  unrevealed: true,
} as const satisfies MetricCharacterHealth
