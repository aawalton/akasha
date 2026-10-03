import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theDungeonOfOneThousandDeathsBrenOlatFortune = {
  id: "01a10350-f6b0-74e3-a286-c529a1caa9c2",
  type: "page-type/metric-character-stat",
  slug: "the-dungeon-of-one-thousand-deaths-bren-olat-fortune",
  character: "character-other/the-dungeon-of-one-thousand-deaths-bren-olat",
  value: 10,
  minValue: 0,
} as const satisfies MetricCharacterStat
