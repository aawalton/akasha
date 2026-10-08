import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const fairweatherTillyToughness = {
  id: "01a106ec-13a5-7558-9620-4ef6dd15f0e7",
  type: "page-type/metric-character-stat",
  slug: "fairweather-tilly-toughness",
  title: "Toughness",
  character: "character-other/fairweather-tilly",
  value: 3,
  minValue: 0,
  displayOrder: 2,
  createdAt: "2026-10-04T12:38:17.253Z",
  updatedAt: "2026-10-04T12:49:14.000Z",
} as const satisfies MetricCharacterStat
