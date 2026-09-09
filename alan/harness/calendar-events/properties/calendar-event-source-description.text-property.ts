import type { TextProperty } from "@akasha/pages/text-property"

export type CalendarEventSourceDescription = string

export const calendarEventSourceDescription = {
  id: "01a06868-aec4-7e8a-a135-d98b1ca87d62",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "calendar-event-source-description",
  propertySlug: "source-description",
  definition: "what a source says an event is",
  maxLength: 6000,
  nameFormat: null,
} as const satisfies TextProperty
