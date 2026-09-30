import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const otherwhereViNalaStrength = {
  id: "01a0ea44-ec35-7e68-bc93-31c9fc9406cc",
  type: "page-type/metric-character-stat",
  slug: "otherwhere-vi-nala-strength",
  character: "character-player/otherwhere-vi-nala",
  value: 3,
  minValue: 0,
  history: "jsonl",
} as const satisfies MetricCharacterStat
