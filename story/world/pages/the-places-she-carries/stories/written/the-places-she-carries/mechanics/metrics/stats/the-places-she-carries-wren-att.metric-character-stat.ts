import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const thePlacesSheCarriesWrenAtt = {
  id: "01a10337-ad0b-7af8-b5dd-a326d1c7bc8b",
  type: "page-type/metric-character-stat",
  slug: "the-places-she-carries-wren-att",
  title: "ATT",
  character: "character-player/the-places-she-carries-wren",
  value: 10,
  minValue: 0,
} as const satisfies MetricCharacterStat
