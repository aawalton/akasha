import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const fairweatherElsieGrace = {
  id: "01a106ec-13a4-75c9-bf36-96d8157bab9b",
  type: "page-type/metric-character-stat",
  slug: "fairweather-elsie-grace",
  title: "Grace",
  character: "character-player/fairweather-elsie",
  value: 2,
  minValue: 0,
  history: "jsonl",
  unrevealed: false,
} as const satisfies MetricCharacterStat
