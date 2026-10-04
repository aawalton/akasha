import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const fairweatherElsieHeart = {
  id: "01a106ec-13a4-7b60-87f2-d408864cc30c",
  type: "page-type/metric-character-stat",
  slug: "fairweather-elsie-heart",
  title: "Heart",
  character: "character-player/fairweather-elsie",
  value: 5,
  minValue: 0,
  history: "jsonl",
  unrevealed: false,
} as const satisfies MetricCharacterStat
