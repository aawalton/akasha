import type { SelectProperty } from "@akasha/pages-system/select-property"

export const mobilityReadingMetric = {
  id: "01a06558-36e9-75cc-bf53-dedc96579d71",
  pageTypeSlug: "select-property",
  slug: "mobility-reading-metric",
  propertySlug: "mobility-reading-metric",
  definition: "which movement the reading measures",
  values: ["forward-fold", "supine-slr", "wall-slide-overhead", "hamstring-lr-gap"],
} as const satisfies SelectProperty

export type MobilityReadingMetric = (typeof mobilityReadingMetric.values)[number]
