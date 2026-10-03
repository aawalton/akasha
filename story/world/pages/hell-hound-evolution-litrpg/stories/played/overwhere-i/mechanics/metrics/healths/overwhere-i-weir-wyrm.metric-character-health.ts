import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const overwhereIWeirWyrm = {
  id: "01a1017f-0f5b-78b7-a19a-3982bbf98bb2",
  type: "page-type/metric-character-health",
  slug: "overwhere-i-weir-wyrm",
  character: "character-other/overwhere-i-weir-wyrm",
  value: 80,
  minValue: 0,
  maxValue: 80,
  displayOrder: 1,
} as const satisfies MetricCharacterHealth
