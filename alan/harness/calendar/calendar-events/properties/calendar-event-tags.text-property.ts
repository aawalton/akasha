import type { TextProperty } from "@akasha/pages-system/text-property"

export type CalendarEventTags = readonly string[]

export const calendarEventTags = {
  id: "01a06868-aec4-7f64-8455-21da84ab0d7a",
  pageTypeSlug: "text-property",
  slug: "calendar-event-tags",
  propertySlug: "tags",
  definition: "what a source tags an event with",
  max: 400,
  nameFormatSlug: null,
} as const satisfies TextProperty
