import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theDungeonOfOneThousandDeathsCaelVornAttunement = {
  id: "01a10352-7941-7de4-9d2d-c9c301c8dae5",
  type: "page-type/metric-character-stat",
  slug: "the-dungeon-of-one-thousand-deaths-cael-vorn-attunement",
  character: "character-other/the-dungeon-of-one-thousand-deaths-cael-vorn",
  value: 14,
  minValue: 0,
} as const satisfies MetricCharacterStat
