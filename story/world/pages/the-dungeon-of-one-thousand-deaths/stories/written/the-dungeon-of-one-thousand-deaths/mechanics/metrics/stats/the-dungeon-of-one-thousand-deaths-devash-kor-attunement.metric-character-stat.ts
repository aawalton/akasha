import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theDungeonOfOneThousandDeathsDevashKorAttunement = {
  id: "01a10350-f6b1-7d2d-85ac-b999bf84c1e6",
  type: "page-type/metric-character-stat",
  slug: "the-dungeon-of-one-thousand-deaths-devash-kor-attunement",
  character: "character-other/the-dungeon-of-one-thousand-deaths-devash-kor",
  value: 10,
  minValue: 0,
} as const satisfies MetricCharacterStat
