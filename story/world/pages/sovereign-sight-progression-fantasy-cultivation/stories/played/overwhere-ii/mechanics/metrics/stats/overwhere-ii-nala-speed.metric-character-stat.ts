import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const overwhereIiNalaSpeed = {
  id: "01a0ed2b-1db9-7f50-a3b8-daceee924e00",
  type: "page-type/metric-character-stat",
  slug: "overwhere-ii-nala-speed",
  character: "character-player/overwhere-ii-nala",
  value: 15,
  minValue: 0,
  history: "jsonl",
  unrevealed: true,
} as const satisfies MetricCharacterStat
