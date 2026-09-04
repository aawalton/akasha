import type { TextProperty } from "@akasha/pages-system/text-property"

export type TraceActivityType = string

export const traceActivityType = {
  id: "01a06935-68b3-777a-bf03-c9ad8aaf558b",
  pageTypeSlug: "text-property",
  slug: "trace-activity-type",
  propertySlug: "activity-type",
  definition: "what the device judged Alan to be doing",
  max: 32,
  nameFormatSlug: null,
} as const satisfies TextProperty
