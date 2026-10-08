import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const fairweatherCoraStrength = {
  id: "01a106ec-13a4-7591-a8d1-b8b56e0ce2eb",
  type: "page-type/metric-character-stat",
  slug: "fairweather-cora-strength",
  title: "Strength",
  character: "character-other/fairweather-cora",
  value: 3,
  minValue: 0,
  displayOrder: 1,
  createdAt: "2026-10-04T12:38:17.252Z",
  updatedAt: "2026-10-04T12:49:14.000Z",
} as const satisfies MetricCharacterStat
