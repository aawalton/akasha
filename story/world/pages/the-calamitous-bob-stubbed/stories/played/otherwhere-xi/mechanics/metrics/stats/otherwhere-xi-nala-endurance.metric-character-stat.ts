import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const otherwhereXiNalaEndurance = {
  id: "01a0ea7f-cf5a-7a4e-8a56-95476958cf4b",
  type: "page-type/metric-character-stat",
  slug: "otherwhere-xi-nala-endurance",
  character: "character-player/otherwhere-xi-nala",
  value: 9,
  minValue: 0,
  history: "jsonl",
  unrevealed: true,
} as const satisfies MetricCharacterStat
