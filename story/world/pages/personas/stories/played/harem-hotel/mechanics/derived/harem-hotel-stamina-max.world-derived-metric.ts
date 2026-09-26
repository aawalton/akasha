import type { WorldDerivedMetric } from "akasha/story/world/mechanics/derived/world-derived-metric.page-type.types.ts"

export const haremHotelStaminaMax = {
  id: "01a0de4d-3d1a-7660-ae55-938438e90de9",
  type: "page-type/world-derived-metric",
  slug: "harem-hotel-stamina-max",
  title: "Max Stamina",
  definition: "the most effort a character in the Harem Hotel can spend",
  formula: {},
} as const satisfies WorldDerivedMetric
