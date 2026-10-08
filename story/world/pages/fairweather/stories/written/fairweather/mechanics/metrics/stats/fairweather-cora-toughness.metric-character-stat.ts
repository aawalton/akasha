import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const fairweatherCoraToughness = {
  id: "01a106ec-13a4-7af8-83f5-9f1700964e00",
  type: "page-type/metric-character-stat",
  slug: "fairweather-cora-toughness",
  title: "Toughness",
  character: "character-other/fairweather-cora",
  value: 12,
  minValue: 0,
  displayOrder: 2,
  createdAt: "2026-10-04T12:38:17.252Z",
  updatedAt: "2026-10-04T12:49:14.000Z",
} as const satisfies MetricCharacterStat
