import type { WorldDerivedMetric } from "akasha/story/world/mechanics/derived/world-derived-metric.page-type.types.ts"

export const haremHotelManaMax = {
  id: "01a0de4d-3d1a-71ca-b461-20b2f29a16ef",
  type: "page-type/world-derived-metric",
  slug: "harem-hotel-mana-max",
  title: "Max Mana",
  definition: "the most mana a character in the Harem Hotel can hold",
  formula: {},
} as const satisfies WorldDerivedMetric
