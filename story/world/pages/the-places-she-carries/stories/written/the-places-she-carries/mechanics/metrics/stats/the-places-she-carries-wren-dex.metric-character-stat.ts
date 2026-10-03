import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const thePlacesSheCarriesWrenDex = {
  id: "01a10337-ad0b-751d-9fc9-0c6878ad5f65",
  type: "page-type/metric-character-stat",
  slug: "the-places-she-carries-wren-dex",
  title: "DEX",
  character: "character-player/the-places-she-carries-wren",
  value: 10,
  minValue: 0,
} as const satisfies MetricCharacterStat
