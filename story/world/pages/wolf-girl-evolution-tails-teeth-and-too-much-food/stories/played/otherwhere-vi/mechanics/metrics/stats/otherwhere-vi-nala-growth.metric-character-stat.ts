import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const otherwhereViNalaGrowth = {
  id: "01a0ea44-ec35-7090-ab61-b463f505f5cf",
  type: "page-type/metric-character-stat",
  slug: "otherwhere-vi-nala-growth",
  character: "character-player/otherwhere-vi-nala",
  value: 3,
  minValue: 0,
  history: "jsonl",
  unrevealed: true,
} as const satisfies MetricCharacterStat
