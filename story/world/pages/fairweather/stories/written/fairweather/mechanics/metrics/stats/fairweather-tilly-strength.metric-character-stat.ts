import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const fairweatherTillyStrength = {
  id: "01a106ec-13a5-714a-89f3-6f41954ec095",
  type: "page-type/metric-character-stat",
  slug: "fairweather-tilly-strength",
  title: "Strength",
  character: "character-other/fairweather-tilly",
  value: 2,
  minValue: 0,
  displayOrder: 1,
} as const satisfies MetricCharacterStat
