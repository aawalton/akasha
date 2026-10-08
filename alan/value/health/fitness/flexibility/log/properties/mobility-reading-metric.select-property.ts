import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const mobilityReadingMetric = {
  id: "01a06558-36e9-75cc-bf53-dedc96579d71",
  type: "page-type/select-property",
  slug: "mobility-reading-metric",
  propertySlug: "mobility-reading-metric",
  definition: "which movement the reading measures",
  values: ["forward-fold", "supine-slr", "wall-slide-overhead", "hamstring-lr-gap"],
  types: "ts",
  createdAt: "2026-09-03T03:37:55.177Z",
  updatedAt: "2026-09-15T16:59:44.000Z",
} as const satisfies SelectProperty
