import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const thePlacesSheCarriesWrenEmp = {
  id: "01a10337-ad0b-7e24-aa7a-85f3ff02687b",
  type: "page-type/metric-character-stat",
  slug: "the-places-she-carries-wren-emp",
  title: "EMP",
  character: "character-player/the-places-she-carries-wren",
  value: 10,
  minValue: 0,
} as const satisfies MetricCharacterStat
