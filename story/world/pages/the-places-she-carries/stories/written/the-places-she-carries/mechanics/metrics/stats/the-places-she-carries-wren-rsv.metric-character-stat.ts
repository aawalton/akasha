import type { MetricCharacterStat } from "akasha/story/world/mechanics/metrics/metric-character/attribute/stat/metric-character-stat.page-type.types.ts"

export const thePlacesSheCarriesWrenRsv = {
  id: "01a10337-ad0b-7fcd-aed8-9ccacf8fff9d",
  type: "page-type/metric-character-stat",
  slug: "the-places-she-carries-wren-rsv",
  title: "RSV",
  character: "character-player/the-places-she-carries-wren",
  value: 9,
  minValue: 0,
} as const satisfies MetricCharacterStat
