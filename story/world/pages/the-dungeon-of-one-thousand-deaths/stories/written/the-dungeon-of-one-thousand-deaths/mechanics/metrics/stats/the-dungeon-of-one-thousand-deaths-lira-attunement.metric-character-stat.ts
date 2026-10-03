import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theDungeonOfOneThousandDeathsLiraAttunement = {
  id: "01a10339-c7ed-7667-9311-54c2cde99aeb",
  type: "page-type/metric-character-stat",
  slug: "the-dungeon-of-one-thousand-deaths-lira-attunement",
  character: "character-other/the-dungeon-of-one-thousand-deaths-lira",
  value: 25,
  minValue: 0,
} as const satisfies MetricCharacterStat
