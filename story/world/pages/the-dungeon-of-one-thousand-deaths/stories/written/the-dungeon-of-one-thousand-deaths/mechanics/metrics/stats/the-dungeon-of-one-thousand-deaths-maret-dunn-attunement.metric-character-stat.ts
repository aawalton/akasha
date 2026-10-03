import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theDungeonOfOneThousandDeathsMaretDunnAttunement = {
  id: "01a10343-8443-7fd1-ae90-671ab92000e5",
  type: "page-type/metric-character-stat",
  slug: "the-dungeon-of-one-thousand-deaths-maret-dunn-attunement",
  character: "character-other/the-dungeon-of-one-thousand-deaths-maret-dunn",
  value: 15,
  minValue: 0,
} as const satisfies MetricCharacterStat
