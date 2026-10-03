import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theDungeonOfOneThousandDeathsTorrinAshAttunement = {
  id: "01a10346-2b78-745d-9cf0-7e6cfe66729e",
  type: "page-type/metric-character-stat",
  slug: "the-dungeon-of-one-thousand-deaths-torrin-ash-attunement",
  character: "character-other/the-dungeon-of-one-thousand-deaths-torrin-ash",
  value: 17,
  minValue: 0,
} as const satisfies MetricCharacterStat
