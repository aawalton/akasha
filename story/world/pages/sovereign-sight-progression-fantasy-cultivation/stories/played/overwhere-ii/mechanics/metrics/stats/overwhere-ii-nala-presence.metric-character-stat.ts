import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const overwhereIiNalaPresence = {
  id: "01a0ed2b-1db9-7513-86b4-ba7d2ceaca75",
  type: "page-type/metric-character-stat",
  slug: "overwhere-ii-nala-presence",
  character: "character-player/overwhere-ii-nala",
  value: 10,
  minValue: 0,
  history: "jsonl",
  unrevealed: true,
} as const satisfies MetricCharacterStat
