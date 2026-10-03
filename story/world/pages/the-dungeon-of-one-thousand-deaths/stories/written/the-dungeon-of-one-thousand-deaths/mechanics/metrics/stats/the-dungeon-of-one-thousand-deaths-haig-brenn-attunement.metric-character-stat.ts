import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theDungeonOfOneThousandDeathsHaigBrennAttunement = {
  id: "01a10348-7ded-7c3e-beaf-102119d9a46d",
  type: "page-type/metric-character-stat",
  slug: "the-dungeon-of-one-thousand-deaths-haig-brenn-attunement",
  character: "character-other/the-dungeon-of-one-thousand-deaths-haig-brenn",
  value: 10,
  minValue: 0,
} as const satisfies MetricCharacterStat
