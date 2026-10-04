import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const fairweatherCoraGrace = {
  id: "01a106ec-13a3-7760-9b26-35a13e51e5b6",
  type: "page-type/metric-character-stat",
  slug: "fairweather-cora-grace",
  title: "Grace",
  character: "character-other/fairweather-cora",
  value: 4,
  minValue: 0,
  displayOrder: 3,
} as const satisfies MetricCharacterStat
