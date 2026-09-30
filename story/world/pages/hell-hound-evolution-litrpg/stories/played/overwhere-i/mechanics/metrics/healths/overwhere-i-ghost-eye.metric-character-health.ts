import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const overwhereIGhostEye = {
  id: "01a0f420-0a07-7d1c-88a5-86ac17650786",
  type: "page-type/metric-character-health",
  slug: "overwhere-i-ghost-eye",
  character: "character-other/overwhere-i-ghost-eye",
  value: 70,
  minValue: 0,
  maxValue: 70,
  displayOrder: 1,
} as const satisfies MetricCharacterHealth
