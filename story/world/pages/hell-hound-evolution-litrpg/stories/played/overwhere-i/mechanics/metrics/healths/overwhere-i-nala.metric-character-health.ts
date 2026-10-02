import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const overwhereINala = {
  id: "01a0ed2c-6424-7fc9-a078-f8d2c767f449",
  type: "page-type/metric-character-health",
  slug: "overwhere-i-nala",
  character: "character-player/overwhere-i-nala",
  value: 38,
  minValue: 0,
  maxValue: 75,
  history: "jsonl",
  displayOrder: 1,
} as const satisfies MetricCharacterHealth
