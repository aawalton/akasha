import type { TextProperty } from "@akasha/pages-system/text-property"

export type CalendarEventDescription = string

export const calendarEventDescription = {
  id: "01a06868-aec4-7e8a-a135-d98b1ca87d62",
  pageTypeSlug: "text-property",
  slug: "calendar-event-description",
  propertySlug: "description",
  definition: "what a source says an event is",
  max: 6000,
  nameFormatSlug: null,
} as const satisfies TextProperty
