import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const overwhereIHarlVoss = {
  id: "01a0fd3c-8066-767c-b6fa-f510b3cbef4c",
  type: "page-type/metric-character-health",
  slug: "overwhere-i-harl-voss",
  character: "character-other/overwhere-i-harl-voss",
  value: 0,
  minValue: 0,
  maxValue: 90,
  displayOrder: 1,
} as const satisfies MetricCharacterHealth
