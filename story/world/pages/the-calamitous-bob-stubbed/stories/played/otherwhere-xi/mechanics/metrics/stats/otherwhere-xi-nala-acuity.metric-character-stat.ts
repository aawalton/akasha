import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const otherwhereXiNalaAcuity = {
  id: "01a0ea7f-cf59-7de5-b0f3-eb9d68bc90f1",
  type: "page-type/metric-character-stat",
  slug: "otherwhere-xi-nala-acuity",
  character: "character-player/otherwhere-xi-nala",
  value: 18,
  minValue: 0,
  history: "jsonl",
  unrevealed: true,
} as const satisfies MetricCharacterStat
