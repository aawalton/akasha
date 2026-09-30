import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const otherwhereViNalaWillpower = {
  id: "01a0ea44-ec36-70e8-a115-d176b94c58e1",
  type: "page-type/metric-character-stat",
  slug: "otherwhere-vi-nala-willpower",
  character: "character-player/otherwhere-vi-nala",
  value: 6,
  minValue: 0,
  history: "jsonl",
} as const satisfies MetricCharacterStat
