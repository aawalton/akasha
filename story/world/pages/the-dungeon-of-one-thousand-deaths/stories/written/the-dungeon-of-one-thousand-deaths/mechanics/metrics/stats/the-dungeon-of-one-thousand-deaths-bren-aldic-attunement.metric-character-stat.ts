import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theDungeonOfOneThousandDeathsBrenAldicAttunement = {
  id: "01a1033b-ed32-7411-9f9c-c0669229f59c",
  type: "page-type/metric-character-stat",
  slug: "the-dungeon-of-one-thousand-deaths-bren-aldic-attunement",
  character: "character-other/the-dungeon-of-one-thousand-deaths-bren-aldic",
  value: 12,
  minValue: 0,
} as const satisfies MetricCharacterStat
