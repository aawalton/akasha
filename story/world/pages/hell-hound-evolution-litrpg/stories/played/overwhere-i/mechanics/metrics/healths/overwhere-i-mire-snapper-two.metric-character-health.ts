import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const overwhereIMireSnapperTwo = {
  id: "01a0f7da-64a8-7e14-80bf-e830f2cc49f5",
  type: "page-type/metric-character-health",
  slug: "overwhere-i-mire-snapper-two",
  character: "character-other/overwhere-i-mire-snapper-two",
  value: 40,
  minValue: 0,
  maxValue: 40,
  displayOrder: 1,
} as const satisfies MetricCharacterHealth
