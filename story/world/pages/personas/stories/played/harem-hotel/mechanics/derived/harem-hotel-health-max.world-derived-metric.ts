import type { WorldDerivedMetric } from "akasha/story/world/mechanics/derived/world-derived-metric.page-type.types.ts"

export const haremHotelHealthMax = {
  id: "01a0de4d-3d1a-7288-9bd8-db9fbd3e6a9e",
  type: "page-type/world-derived-metric",
  slug: "harem-hotel-health-max",
  title: "Max Health",
  definition: "the most health a character in the Harem Hotel can have",
  formula: {},
} as const satisfies WorldDerivedMetric
