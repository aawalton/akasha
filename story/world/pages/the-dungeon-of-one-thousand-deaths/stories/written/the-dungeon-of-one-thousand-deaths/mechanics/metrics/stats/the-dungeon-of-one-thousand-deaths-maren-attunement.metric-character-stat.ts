import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theDungeonOfOneThousandDeathsMarenAttunement = {
  id: "01a10336-d596-73bb-bf36-c3027f63a304",
  type: "page-type/metric-character-stat",
  slug: "the-dungeon-of-one-thousand-deaths-maren-attunement",
  character: "character-other/the-dungeon-of-one-thousand-deaths-maren",
  value: 14,
  minValue: 0,
} as const satisfies MetricCharacterStat
