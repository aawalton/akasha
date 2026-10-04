import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const fairweatherElsieWits = {
  id: "01a106ec-13a4-7fc2-ad83-3e2851f84b84",
  type: "page-type/metric-character-stat",
  slug: "fairweather-elsie-wits",
  title: "Wits",
  character: "character-player/fairweather-elsie",
  value: 4,
  minValue: 0,
  displayOrder: 4,
  history: "jsonl",
  unrevealed: false,
} as const satisfies MetricCharacterStat
