import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const fairweatherElsieWits = {
  id: "01a106ec-13a4-7fc2-ad83-3e2851f84b84",
  type: "page-type/metric-character-stat",
  slug: "fairweather-elsie-wits",
  title: "Wits",
  character: "character-player/fairweather-elsie",
  value: 15,
  minValue: 0,
  displayOrder: 4,
  history: "jsonl",
  unrevealed: false,
  createdAt: "2026-10-04T12:38:17.252Z",
  updatedAt: "2026-10-07T02:24:42.000Z",
} as const satisfies MetricCharacterStat
