import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theDungeonOfOneThousandDeathsTovaFennAttunement = {
  id: "01a1034c-3281-7d89-a585-bb300a039db8",
  type: "page-type/metric-character-stat",
  slug: "the-dungeon-of-one-thousand-deaths-tova-fenn-attunement",
  character: "character-other/the-dungeon-of-one-thousand-deaths-tova-fenn",
  value: 10,
  minValue: 0,
} as const satisfies MetricCharacterStat
