import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theDungeonOfOneThousandDeathsRenDallishAttunement = {
  id: "01a10346-2b77-7929-bdd8-93c8c9444928",
  type: "page-type/metric-character-stat",
  slug: "the-dungeon-of-one-thousand-deaths-ren-dallish-attunement",
  character: "character-other/the-dungeon-of-one-thousand-deaths-ren-dallish",
  value: 9,
  minValue: 0,
} as const satisfies MetricCharacterStat
