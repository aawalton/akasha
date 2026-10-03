import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theIdleEpochCallumWisdom = {
  id: "01a10332-4089-74a6-b524-726eedc0655c",
  type: "page-type/metric-character-stat",
  slug: "the-idle-epoch-callum-wisdom",
  character: "character-player/the-idle-epoch-callum",
  value: 40,
  minValue: 0,
} as const satisfies MetricCharacterStat
