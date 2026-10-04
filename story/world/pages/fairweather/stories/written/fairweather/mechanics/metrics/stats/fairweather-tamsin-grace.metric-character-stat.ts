import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const fairweatherTamsinGrace = {
  id: "01a106ec-13a4-77ea-957d-2efc07d99356",
  type: "page-type/metric-character-stat",
  slug: "fairweather-tamsin-grace",
  title: "Grace",
  character: "character-other/fairweather-tamsin",
  value: 11,
  minValue: 0,
} as const satisfies MetricCharacterStat
