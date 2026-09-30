import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const otherwhereIAlanStrength = {
  id: "01a0e363-5bac-7798-ab89-59aacb260455",
  type: "page-type/metric-character-stat",
  slug: "otherwhere-i-alan-strength",
  character: "character-player/otherwhere-i-alan",
  value: 4,
  minValue: 0,
  history: "jsonl",
} as const satisfies MetricCharacterStat
