import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const fairweatherElsieHeart = {
  id: "01a106ec-13a4-7b60-87f2-d408864cc30c",
  type: "page-type/metric-character-stat",
  slug: "fairweather-elsie-heart",
  title: "Heart",
  character: "character-player/fairweather-elsie",
  value: 21,
  minValue: 0,
  displayOrder: 5,
  history: "jsonl",
  unrevealed: false,
  createdAt: "2026-10-04T12:38:17.252Z",
  updatedAt: "2026-10-07T02:24:42.000Z",
} as const satisfies MetricCharacterStat
