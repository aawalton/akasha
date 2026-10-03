import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const theDungeonOfOneThousandDeathsSenneVarethAttunement = {
  id: "01a1034d-7ea5-7407-97d8-96bc44c987a8",
  type: "page-type/metric-character-stat",
  slug: "the-dungeon-of-one-thousand-deaths-senne-vareth-attunement",
  character: "character-other/the-dungeon-of-one-thousand-deaths-senne-vareth",
  value: 15,
  minValue: 0,
} as const satisfies MetricCharacterStat
