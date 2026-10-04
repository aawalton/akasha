import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const fairweatherCoraHeart = {
  id: "01a106ec-13a3-7cbe-b60a-351846515874",
  type: "page-type/metric-character-stat",
  slug: "fairweather-cora-heart",
  title: "Heart",
  character: "character-other/fairweather-cora",
  value: 27,
  minValue: 0,
  displayOrder: 5,
} as const satisfies MetricCharacterStat
