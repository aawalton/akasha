import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const fairweatherTamsinToughness = {
  id: "01a106ec-13a5-7c1e-9de1-59dd3aad2a6f",
  type: "page-type/metric-character-stat",
  slug: "fairweather-tamsin-toughness",
  title: "Toughness",
  character: "character-other/fairweather-tamsin",
  value: 13,
  minValue: 0,
  displayOrder: 2,
} as const satisfies MetricCharacterStat
