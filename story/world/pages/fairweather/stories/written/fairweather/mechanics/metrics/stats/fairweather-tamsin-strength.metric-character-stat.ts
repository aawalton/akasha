import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const fairweatherTamsinStrength = {
  id: "01a106ec-13a5-7fd8-91ed-9f7defe228c2",
  type: "page-type/metric-character-stat",
  slug: "fairweather-tamsin-strength",
  title: "Strength",
  character: "character-other/fairweather-tamsin",
  value: 31,
  minValue: 0,
  displayOrder: 1,
} as const satisfies MetricCharacterStat
