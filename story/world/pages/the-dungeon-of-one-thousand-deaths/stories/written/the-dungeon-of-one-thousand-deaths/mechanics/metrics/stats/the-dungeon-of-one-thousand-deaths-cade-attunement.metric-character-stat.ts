import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theDungeonOfOneThousandDeathsCadeAttunement = {
  id: "01a10350-f6b0-7f13-b451-49393ada3c13",
  type: "page-type/metric-character-stat",
  slug: "the-dungeon-of-one-thousand-deaths-cade-attunement",
  character: "character-other/the-dungeon-of-one-thousand-deaths-cade",
  value: 3,
  minValue: 0,
} as const satisfies MetricCharacterStat
