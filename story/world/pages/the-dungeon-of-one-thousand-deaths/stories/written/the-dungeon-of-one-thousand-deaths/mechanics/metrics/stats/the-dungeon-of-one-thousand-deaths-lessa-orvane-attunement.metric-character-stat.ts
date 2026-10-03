import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theDungeonOfOneThousandDeathsLessaOrvaneAttunement = {
  id: "01a10349-c466-7cb0-8d5f-e9f5840cb6ca",
  type: "page-type/metric-character-stat",
  slug: "the-dungeon-of-one-thousand-deaths-lessa-orvane-attunement",
  character: "character-other/the-dungeon-of-one-thousand-deaths-lessa-orvane",
  value: 15,
  minValue: 0,
} as const satisfies MetricCharacterStat
