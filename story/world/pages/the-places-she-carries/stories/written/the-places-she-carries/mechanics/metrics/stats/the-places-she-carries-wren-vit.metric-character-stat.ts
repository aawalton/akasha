import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const thePlacesSheCarriesWrenVit = {
  id: "01a10337-ad0b-71d0-bbbb-f62a67960769",
  type: "page-type/metric-character-stat",
  slug: "the-places-she-carries-wren-vit",
  title: "VIT",
  character: "character-player/the-places-she-carries-wren",
  value: 8,
  minValue: 0,
} as const satisfies MetricCharacterStat
