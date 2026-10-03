import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theDungeonOfOneThousandDeathsSeraVantAttunement = {
  id: "01a1033b-ed32-7ce6-a87f-7ed51eb36c12",
  type: "page-type/metric-character-stat",
  slug: "the-dungeon-of-one-thousand-deaths-sera-vant-attunement",
  character: "character-other/the-dungeon-of-one-thousand-deaths-sera-vant",
  value: 16,
  minValue: 0,
} as const satisfies MetricCharacterStat
