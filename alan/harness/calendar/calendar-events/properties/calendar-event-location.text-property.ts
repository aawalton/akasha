import type { TextProperty } from "@akasha/pages-system/text-property"

export type CalendarEventLocation = string

export const calendarEventLocation = {
  id: "01a06868-aec4-7fd3-bd9d-717bc78c9613",
  pageTypeSlug: "text-property",
  slug: "calendar-event-location",
  propertySlug: "location",
  definition: "where an event is held",
  max: 400,
  nameFormatSlug: null,
} as const satisfies TextProperty
