import type { UrlProperty } from "@akasha/pages-system/url-property"

export type CalendarEventRegistrationUrl = string

export const calendarEventRegistrationUrl = {
  id: "01a06868-aec4-74a6-87b5-95514debcf9d",
  pageTypeSlug: "url-property",
  slug: "calendar-event-registration-url",
  propertySlug: "registration-url",
  definition: "the address a place at an event is taken at",
} as const satisfies UrlProperty
