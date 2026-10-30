import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const mobilityReadingMetric = {
  id: "01a06558-36e9-75cc-bf53-dedc96579d71",
  type: "page-type/select-property",
  slug: "mobility-reading-metric",
  propertySlug: "mobility-reading-metric",
  definition: "what a measurement measures",
  values: ["forward-fold", "supine-slr", "wall-slide-overhead", "hamstring-lr-gap"],
  types: "ts",
  createdAt: "2026-09-03T03:37:55.177Z",
  updatedAt: "2026-10-30T16:50:44.507Z",
} as const satisfies SelectProperty
