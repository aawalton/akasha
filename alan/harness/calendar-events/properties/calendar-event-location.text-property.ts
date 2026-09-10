import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type CalendarEventLocation = string

export const calendarEventLocation = {
  id: "01a06868-aec4-7fd3-bd9d-717bc78c9613",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "calendar-event-location",
  propertySlug: "location",
  definition: "where an event is held",
  maxLength: 400,
  nameFormat: null,
} as const satisfies TextProperty
