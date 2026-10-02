import type { MetricCharacterHealth } from "akasha/story/world/mechanics/metrics/metric-character/resource/health/metric-character-health.page-type.types.ts"

export const overwhereIVossDrakewolf = {
  id: "01a0fd3c-8068-7520-91b8-2094b4e6a342",
  type: "page-type/metric-character-health",
  slug: "overwhere-i-voss-drakewolf",
  character: "character-other/overwhere-i-voss-drakewolf",
  value: 0,
  minValue: 0,
  maxValue: 35,
  displayOrder: 1,
} as const satisfies MetricCharacterHealth
