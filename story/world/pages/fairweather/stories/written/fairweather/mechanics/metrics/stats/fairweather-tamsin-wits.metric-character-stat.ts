import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const fairweatherTamsinWits = {
  id: "01a106ec-13a5-7795-bb22-1bcb72c78b0c",
  type: "page-type/metric-character-stat",
  slug: "fairweather-tamsin-wits",
  title: "Wits",
  character: "character-other/fairweather-tamsin",
  value: 1,
  minValue: 0,
} as const satisfies MetricCharacterStat
