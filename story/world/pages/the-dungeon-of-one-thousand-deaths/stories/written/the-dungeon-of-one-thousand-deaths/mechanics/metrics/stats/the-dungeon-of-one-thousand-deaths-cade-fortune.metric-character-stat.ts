import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theDungeonOfOneThousandDeathsCadeFortune = {
  id: "01a10350-f6b1-778c-8aba-7dfb244e8940",
  type: "page-type/metric-character-stat",
  slug: "the-dungeon-of-one-thousand-deaths-cade-fortune",
  character: "character-other/the-dungeon-of-one-thousand-deaths-cade",
  value: 12,
  minValue: 0,
} as const satisfies MetricCharacterStat
