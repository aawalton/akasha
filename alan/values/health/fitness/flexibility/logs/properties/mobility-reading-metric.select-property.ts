import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const mobilityReadingMetric = {
  id: "01a06558-36e9-75cc-bf53-dedc96579d71",
  type: "select-property",
  slug: "mobility-reading-metric",
  propertySlug: "mobility-reading-metric",
  definition: "which movement the reading measures",
  values: ["forward-fold", "supine-slr", "wall-slide-overhead", "hamstring-lr-gap"],
  types: "ts",
} as const satisfies SelectProperty
