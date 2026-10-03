import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theDungeonOfOneThousandDeathsEssanyCordAttunement = {
  id: "01a10344-9e9c-7c08-a53c-2bf7411e2dc9",
  type: "page-type/metric-character-stat",
  slug: "the-dungeon-of-one-thousand-deaths-essany-cord-attunement",
  character: "character-other/the-dungeon-of-one-thousand-deaths-essany-cord",
  value: 15,
  minValue: 0,
} as const satisfies MetricCharacterStat
