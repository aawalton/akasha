import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const fairweatherElsieToughness = {
  id: "01a106ec-13a4-7d98-8f67-a0d7095c8e21",
  type: "page-type/metric-character-stat",
  slug: "fairweather-elsie-toughness",
  title: "Toughness",
  character: "character-player/fairweather-elsie",
  value: 2,
  minValue: 0,
  displayOrder: 2,
  history: "jsonl",
  unrevealed: false,
} as const satisfies MetricCharacterStat
