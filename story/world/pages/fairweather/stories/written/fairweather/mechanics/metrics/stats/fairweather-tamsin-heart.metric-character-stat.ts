import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const fairweatherTamsinHeart = {
  id: "01a106ec-13a5-7468-87e4-024df8e51dfe",
  type: "page-type/metric-character-stat",
  slug: "fairweather-tamsin-heart",
  title: "Heart",
  character: "character-other/fairweather-tamsin",
  value: 2,
  minValue: 0,
} as const satisfies MetricCharacterStat
