import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const overwhereIQuarryCrewmanFive = {
  id: "01a0fd3c-8067-72d0-a4ec-9ca5d79b7c3f",
  type: "page-type/metric-character-health",
  slug: "overwhere-i-quarry-crewman-five",
  character: "character-other/overwhere-i-quarry-crewman-five",
  value: 0,
  minValue: 0,
  maxValue: 42,
  displayOrder: 1,
} as const satisfies MetricCharacterHealth
