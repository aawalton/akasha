import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theDungeonOfOneThousandDeathsFennickRallAttunement = {
  id: "01a10341-4dd9-77a5-9753-f846b8bffa2b",
  type: "page-type/metric-character-stat",
  slug: "the-dungeon-of-one-thousand-deaths-fennick-rall-attunement",
  character: "character-other/the-dungeon-of-one-thousand-deaths-fennick-rall",
  value: 13,
  minValue: 0,
} as const satisfies MetricCharacterStat
