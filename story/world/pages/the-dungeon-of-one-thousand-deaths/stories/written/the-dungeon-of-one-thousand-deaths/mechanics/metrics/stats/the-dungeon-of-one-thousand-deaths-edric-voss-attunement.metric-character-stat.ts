import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theDungeonOfOneThousandDeathsEdricVossAttunement = {
  id: "01a10334-9a80-7cd4-96bb-8608f2d4fbb5",
  type: "page-type/metric-character-stat",
  slug: "the-dungeon-of-one-thousand-deaths-edric-voss-attunement",
  character: "character-other/the-dungeon-of-one-thousand-deaths-edric-voss",
  value: 12,
  minValue: 0,
} as const satisfies MetricCharacterStat
