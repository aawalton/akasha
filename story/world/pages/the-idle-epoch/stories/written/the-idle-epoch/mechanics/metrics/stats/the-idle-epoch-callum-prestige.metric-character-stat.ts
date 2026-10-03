import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theIdleEpochCallumPrestige = {
  id: "01a10332-4089-79cf-b8f4-00e827738c24",
  type: "page-type/metric-character-stat",
  slug: "the-idle-epoch-callum-prestige",
  character: "character-player/the-idle-epoch-callum",
  value: 1,
  minValue: 0,
} as const satisfies MetricCharacterStat
