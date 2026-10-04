import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const fairweatherTillyGrace = {
  id: "01a106ec-13a5-7fb1-ab8c-d82715290325",
  type: "page-type/metric-character-stat",
  slug: "fairweather-tilly-grace",
  title: "Grace",
  character: "character-other/fairweather-tilly",
  value: 5,
  minValue: 0,
} as const satisfies MetricCharacterStat
