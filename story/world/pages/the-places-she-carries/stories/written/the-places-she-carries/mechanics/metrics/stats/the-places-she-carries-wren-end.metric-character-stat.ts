import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const thePlacesSheCarriesWrenEnd = {
  id: "01a10337-ad0b-782d-96d2-9b6793ccbe26",
  type: "page-type/metric-character-stat",
  slug: "the-places-she-carries-wren-end",
  title: "END",
  character: "character-player/the-places-she-carries-wren",
  value: 8,
  minValue: 0,
} as const satisfies MetricCharacterStat
