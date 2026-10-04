import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const fairweatherTillyHeart = {
  id: "01a106ec-13a5-7f99-92a0-99a80da3b4b3",
  type: "page-type/metric-character-stat",
  slug: "fairweather-tilly-heart",
  title: "Heart",
  character: "character-other/fairweather-tilly",
  value: 4,
  minValue: 0,
  displayOrder: 5,
} as const satisfies MetricCharacterStat
