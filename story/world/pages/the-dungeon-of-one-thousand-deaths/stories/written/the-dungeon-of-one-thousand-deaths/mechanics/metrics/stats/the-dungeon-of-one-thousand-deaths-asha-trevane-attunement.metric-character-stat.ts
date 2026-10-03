import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theDungeonOfOneThousandDeathsAshaTrevaneAttunement = {
  id: "01a1033f-edd8-747c-950f-f2ee61f1b4ae",
  type: "page-type/metric-character-stat",
  slug: "the-dungeon-of-one-thousand-deaths-asha-trevane-attunement",
  character: "character-other/the-dungeon-of-one-thousand-deaths-asha-trevane",
  value: 14,
  minValue: 0,
} as const satisfies MetricCharacterStat
