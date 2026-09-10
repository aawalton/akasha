import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type TraceActivityType = string

export const traceActivityType = {
  id: "01a06935-68b3-777a-bf03-c9ad8aaf558b",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "trace-activity-type",
  propertySlug: "activity-type",
  definition: "what the device judged Alan to be doing",
  maxLength: 32,
  nameFormat: null,
} as const satisfies TextProperty
