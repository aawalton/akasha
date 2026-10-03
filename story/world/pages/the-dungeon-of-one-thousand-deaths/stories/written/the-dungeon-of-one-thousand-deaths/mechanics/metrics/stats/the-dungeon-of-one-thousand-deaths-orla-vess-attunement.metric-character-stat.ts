import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theDungeonOfOneThousandDeathsOrlaVessAttunement = {
  id: "01a1034e-bd25-765c-abb8-ab64e8f5c927",
  type: "page-type/metric-character-stat",
  slug: "the-dungeon-of-one-thousand-deaths-orla-vess-attunement",
  character: "character-other/the-dungeon-of-one-thousand-deaths-orla-vess",
  value: 15,
  minValue: 0,
} as const satisfies MetricCharacterStat
