import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theDungeonOfOneThousandDeathsLiraFortune = {
  id: "01a10339-c7ed-764f-a78c-27f2c0e5b396",
  type: "page-type/metric-character-stat",
  slug: "the-dungeon-of-one-thousand-deaths-lira-fortune",
  character: "character-other/the-dungeon-of-one-thousand-deaths-lira",
  value: 15,
  minValue: 0,
} as const satisfies MetricCharacterStat
