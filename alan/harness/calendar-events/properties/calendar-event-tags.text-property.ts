import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type CalendarEventTags = readonly string[]

export const calendarEventTags = {
  id: "01a06868-aec4-7f64-8455-21da84ab0d7a",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "calendar-event-tags",
  propertySlug: "tags",
  definition: "what a source tags an event with",
  maxLength: 400,
  nameFormat: null,
} as const satisfies TextProperty
