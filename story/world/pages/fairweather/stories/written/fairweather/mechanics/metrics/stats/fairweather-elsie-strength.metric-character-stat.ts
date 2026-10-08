import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const fairweatherElsieStrength = {
  id: "01a106ec-13a4-7fa6-b490-23d21f023c40",
  type: "page-type/metric-character-stat",
  slug: "fairweather-elsie-strength",
  title: "Strength",
  character: "character-player/fairweather-elsie",
  value: 22,
  minValue: 0,
  displayOrder: 1,
  history: "jsonl",
  unrevealed: false,
  createdAt: "2026-10-04T12:38:17.252Z",
  updatedAt: "2026-10-07T02:24:42.000Z",
} as const satisfies MetricCharacterStat
