import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theIdleEpochCallumIntelligence = {
  id: "01a10332-4088-7aed-80fa-11a80001401e",
  type: "page-type/metric-character-stat",
  slug: "the-idle-epoch-callum-intelligence",
  character: "character-player/the-idle-epoch-callum",
  value: 40,
  minValue: 0,
} as const satisfies MetricCharacterStat
