import type { TextProperty } from "@akasha/pages-system/text-property"

export type CalendarEventExternalId = string

export const calendarEventExternalId = {
  id: "01a06868-aec4-7ff6-979a-741f7060934c",
  pageTypeSlug: "text-property",
  slug: "calendar-event-external-id",
  propertySlug: "external-id",
  definition: "the id a source gives an event",
  max: 400,
  nameFormatSlug: null,
} as const satisfies TextProperty
