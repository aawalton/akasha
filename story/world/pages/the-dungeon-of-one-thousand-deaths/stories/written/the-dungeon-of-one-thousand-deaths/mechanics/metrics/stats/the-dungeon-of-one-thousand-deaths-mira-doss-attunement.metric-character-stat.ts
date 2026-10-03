import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theDungeonOfOneThousandDeathsMiraDossAttunement = {
  id: "01a1033b-ed32-7a73-bf10-ab027e1a4cac",
  type: "page-type/metric-character-stat",
  slug: "the-dungeon-of-one-thousand-deaths-mira-doss-attunement",
  character: "character-other/the-dungeon-of-one-thousand-deaths-mira-doss",
  value: 11,
  minValue: 0,
} as const satisfies MetricCharacterStat
