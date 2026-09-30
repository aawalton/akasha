import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const otherwhereViNalaVitality = {
  id: "01a0ea44-ec36-71d2-8b2a-5e9fa38065b4",
  type: "page-type/metric-character-stat",
  slug: "otherwhere-vi-nala-vitality",
  character: "character-player/otherwhere-vi-nala",
  value: 3,
  minValue: 0,
  history: "jsonl",
} as const satisfies MetricCharacterStat
