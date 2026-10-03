import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theDungeonOfOneThousandDeathsCadeVitality = {
  id: "01a10350-f6b1-773c-ad59-f1f57a13ef8d",
  type: "page-type/metric-character-stat",
  slug: "the-dungeon-of-one-thousand-deaths-cade-vitality",
  character: "character-other/the-dungeon-of-one-thousand-deaths-cade",
  value: 0,
  minValue: 0,
} as const satisfies MetricCharacterStat
