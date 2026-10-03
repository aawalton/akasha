import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theDungeonOfOneThousandDeathsSeraVantResolve = {
  id: "01a1033b-ed32-75db-9459-1cde1117165e",
  type: "page-type/metric-character-stat",
  slug: "the-dungeon-of-one-thousand-deaths-sera-vant-resolve",
  character: "character-other/the-dungeon-of-one-thousand-deaths-sera-vant",
  value: 42,
  minValue: 0,
} as const satisfies MetricCharacterStat
