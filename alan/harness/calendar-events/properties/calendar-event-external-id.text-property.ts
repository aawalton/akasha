import type { TextProperty } from "@akasha/pages/text-property"

export type CalendarEventExternalId = string

export const calendarEventExternalId = {
  id: "01a06868-aec4-7ff6-979a-741f7060934c",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "calendar-event-external-id",
  propertySlug: "external-id",
  definition: "the id a source gives an event",
  maxLength: 400,
  nameFormat: null,
} as const satisfies TextProperty
