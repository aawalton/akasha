import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const fairweatherCoraWits = {
  id: "01a106ec-13a4-7bda-a6dd-bcb830ab06e9",
  type: "page-type/metric-character-stat",
  slug: "fairweather-cora-wits",
  title: "Wits",
  character: "character-other/fairweather-cora",
  value: 12,
  minValue: 0,
  displayOrder: 4,
} as const satisfies MetricCharacterStat
