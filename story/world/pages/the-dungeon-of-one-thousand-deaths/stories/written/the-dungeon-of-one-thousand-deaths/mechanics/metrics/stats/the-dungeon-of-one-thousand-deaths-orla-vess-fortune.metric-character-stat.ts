import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theDungeonOfOneThousandDeathsOrlaVessFortune = {
  id: "01a1034e-bd25-7e3b-9e42-331dc88f70f2",
  type: "page-type/metric-character-stat",
  slug: "the-dungeon-of-one-thousand-deaths-orla-vess-fortune",
  character: "character-other/the-dungeon-of-one-thousand-deaths-orla-vess",
  value: 11,
  minValue: 0,
} as const satisfies MetricCharacterStat
