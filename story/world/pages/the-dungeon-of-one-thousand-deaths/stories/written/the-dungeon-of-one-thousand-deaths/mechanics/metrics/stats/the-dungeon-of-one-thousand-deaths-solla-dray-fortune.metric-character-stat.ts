import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theDungeonOfOneThousandDeathsSollaDrayFortune = {
  id: "01a10350-f6b1-7f7e-9d54-cc6d9015e276",
  type: "page-type/metric-character-stat",
  slug: "the-dungeon-of-one-thousand-deaths-solla-dray-fortune",
  character: "character-other/the-dungeon-of-one-thousand-deaths-solla-dray",
  value: 15,
  minValue: 0,
} as const satisfies MetricCharacterStat
