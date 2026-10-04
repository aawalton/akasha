import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const fairweatherTillyWits = {
  id: "01a106ec-13a5-73db-9a42-6a0c69a5d955",
  type: "page-type/metric-character-stat",
  slug: "fairweather-tilly-wits",
  title: "Wits",
  character: "character-other/fairweather-tilly",
  value: 10,
  minValue: 0,
  displayOrder: 4,
} as const satisfies MetricCharacterStat
