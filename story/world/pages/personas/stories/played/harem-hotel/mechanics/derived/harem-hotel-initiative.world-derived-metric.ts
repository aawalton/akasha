import type { WorldDerivedMetric } from "akasha/story/world/mechanics/derived/world-derived-metric.page-type.types.ts"

export const haremHotelInitiative = {
  id: "01a0de4e-cf62-7161-ae89-cbef3719472f",
  type: "page-type/world-derived-metric",
  slug: "harem-hotel-initiative",
  title: "Initiative",
  definition: "how early a character in the Harem Hotel acts in a fight",
  formula: {},
} as const satisfies WorldDerivedMetric
