import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const fairweatherElsieStrength = {
  id: "01a106ec-13a4-7fa6-b490-23d21f023c40",
  type: "page-type/metric-character-stat",
  slug: "fairweather-elsie-strength",
  title: "Strength",
  character: "character-player/fairweather-elsie",
  value: 1,
  minValue: 0,
  history: "jsonl",
  unrevealed: false,
} as const satisfies MetricCharacterStat
