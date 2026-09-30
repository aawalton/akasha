import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const otherwhereXiNalaWillpower = {
  id: "01a0ea7f-cf5b-7a64-93bc-7298d6e03f78",
  type: "page-type/metric-character-stat",
  slug: "otherwhere-xi-nala-willpower",
  character: "character-player/otherwhere-xi-nala",
  value: 14,
  minValue: 0,
  history: "jsonl",
  unrevealed: true,
} as const satisfies MetricCharacterStat
