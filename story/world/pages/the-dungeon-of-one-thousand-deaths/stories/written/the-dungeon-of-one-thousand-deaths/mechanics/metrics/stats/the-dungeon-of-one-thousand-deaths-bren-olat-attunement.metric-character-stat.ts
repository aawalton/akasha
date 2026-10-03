import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theDungeonOfOneThousandDeathsBrenOlatAttunement = {
  id: "01a10350-f6b0-7994-95f8-5e766db4a36c",
  type: "page-type/metric-character-stat",
  slug: "the-dungeon-of-one-thousand-deaths-bren-olat-attunement",
  character: "character-other/the-dungeon-of-one-thousand-deaths-bren-olat",
  value: 6,
  minValue: 0,
} as const satisfies MetricCharacterStat
