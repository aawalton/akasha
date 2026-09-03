import type { TextProperty } from "@akasha/pages-system/text-property"

export type TimelineDistribution = string

export const timelineDistribution = {
  id: "01a06577-f385-767b-aafb-1378cb399f58",
  pageTypeSlug: "text-property",
  slug: "timeline-distribution",
  propertySlug: "timeline-distribution",
  definition: "how a story's events are spread across its time",
  max: 1000,
  nameFormatSlug: null,
} as const satisfies TextProperty
