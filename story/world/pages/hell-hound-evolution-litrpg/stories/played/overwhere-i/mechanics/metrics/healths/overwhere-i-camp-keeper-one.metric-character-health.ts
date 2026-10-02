import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const overwhereICampKeeperOne = {
  id: "01a0fe2a-6e2d-7bf6-9ac0-a16d97bfb384",
  type: "page-type/metric-character-health",
  slug: "overwhere-i-camp-keeper-one",
  character: "character-other/overwhere-i-camp-keeper-one",
  value: 0,
  minValue: 0,
  maxValue: 32,
  displayOrder: 1,
} as const satisfies MetricCharacterHealth
