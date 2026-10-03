import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theDungeonOfOneThousandDeathsOrvynThelAttunement = {
  id: "01a1033b-ed32-7b6a-bc07-965b426bdeae",
  type: "page-type/metric-character-stat",
  slug: "the-dungeon-of-one-thousand-deaths-orvyn-thel-attunement",
  character: "character-other/the-dungeon-of-one-thousand-deaths-orvyn-thel",
  value: 28,
  minValue: 0,
} as const satisfies MetricCharacterStat
