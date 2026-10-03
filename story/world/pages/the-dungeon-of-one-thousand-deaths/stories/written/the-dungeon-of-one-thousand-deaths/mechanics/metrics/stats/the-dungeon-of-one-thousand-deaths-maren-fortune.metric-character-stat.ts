import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theDungeonOfOneThousandDeathsMarenFortune = {
  id: "01a10336-d596-76a5-a84f-1d3586a6c68c",
  type: "page-type/metric-character-stat",
  slug: "the-dungeon-of-one-thousand-deaths-maren-fortune",
  character: "character-other/the-dungeon-of-one-thousand-deaths-maren",
  value: 13,
  minValue: 0,
} as const satisfies MetricCharacterStat
