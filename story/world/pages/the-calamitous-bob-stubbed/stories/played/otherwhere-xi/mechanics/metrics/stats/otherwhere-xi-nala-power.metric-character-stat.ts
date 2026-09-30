import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const otherwhereXiNalaPower = {
  id: "01a0ea7f-cf5a-77d0-a10c-a9481414fce3",
  type: "page-type/metric-character-stat",
  slug: "otherwhere-xi-nala-power",
  character: "character-player/otherwhere-xi-nala",
  value: 6,
  minValue: 0,
  history: "jsonl",
  unrevealed: true,
} as const satisfies MetricCharacterStat
