import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const otherwhereViNalaLevel = {
  id: "01a0ea44-ec35-78c6-bd7d-3c8d54425897",
  type: "page-type/metric-character-stat",
  slug: "otherwhere-vi-nala-level",
  character: "character-player/otherwhere-vi-nala",
  value: 1,
  minValue: 1,
  maxValue: 10,
  history: "jsonl",
} as const satisfies MetricCharacterStat
