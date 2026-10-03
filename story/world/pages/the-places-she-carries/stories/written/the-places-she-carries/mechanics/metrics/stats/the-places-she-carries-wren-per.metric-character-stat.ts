import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const thePlacesSheCarriesWrenPer = {
  id: "01a10337-ad0b-77d6-a8c9-6ef36f52418d",
  type: "page-type/metric-character-stat",
  slug: "the-places-she-carries-wren-per",
  title: "PER",
  character: "character-player/the-places-she-carries-wren",
  value: 10,
  minValue: 0,
} as const satisfies MetricCharacterStat
