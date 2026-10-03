import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theDungeonOfOneThousandDeathsInesMaretAttunement = {
  id: "01a10350-f6b1-7ab7-a521-b0b6849bd998",
  type: "page-type/metric-character-stat",
  slug: "the-dungeon-of-one-thousand-deaths-ines-maret-attunement",
  character: "character-other/the-dungeon-of-one-thousand-deaths-ines-maret",
  value: 11,
  minValue: 0,
} as const satisfies MetricCharacterStat
