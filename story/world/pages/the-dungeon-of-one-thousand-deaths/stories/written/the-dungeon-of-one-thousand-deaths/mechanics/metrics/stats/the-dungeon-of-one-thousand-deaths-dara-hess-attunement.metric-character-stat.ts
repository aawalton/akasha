import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theDungeonOfOneThousandDeathsDaraHessAttunement = {
  id: "01a1033b-ed32-713e-80b8-728dad743e1e",
  type: "page-type/metric-character-stat",
  slug: "the-dungeon-of-one-thousand-deaths-dara-hess-attunement",
  character: "character-other/the-dungeon-of-one-thousand-deaths-dara-hess",
  value: 7,
  minValue: 0,
} as const satisfies MetricCharacterStat
