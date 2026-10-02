import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const overwhereIQuarryCrewmanOne = {
  id: "01a0fd3c-8067-7536-ac1d-dfcc594e4c0f",
  type: "page-type/metric-character-health",
  slug: "overwhere-i-quarry-crewman-one",
  character: "character-other/overwhere-i-quarry-crewman-one",
  value: 21,
  minValue: 0,
  maxValue: 30,
  displayOrder: 1,
} as const satisfies MetricCharacterHealth
