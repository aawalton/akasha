import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theDungeonOfOneThousandDeathsSollaDrayAttunement = {
  id: "01a10350-f6b1-7f2b-9181-040577d71255",
  type: "page-type/metric-character-stat",
  slug: "the-dungeon-of-one-thousand-deaths-solla-dray-attunement",
  character: "character-other/the-dungeon-of-one-thousand-deaths-solla-dray",
  value: 8,
  minValue: 0,
} as const satisfies MetricCharacterStat
