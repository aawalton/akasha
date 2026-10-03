import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theDungeonOfOneThousandDeathsTovaFennFortune = {
  id: "01a1034c-3282-78a6-aea6-070180f7ed95",
  type: "page-type/metric-character-stat",
  slug: "the-dungeon-of-one-thousand-deaths-tova-fenn-fortune",
  character: "character-other/the-dungeon-of-one-thousand-deaths-tova-fenn",
  value: 12,
  minValue: 0,
} as const satisfies MetricCharacterStat
