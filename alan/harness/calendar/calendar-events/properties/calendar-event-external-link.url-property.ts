import type { UrlProperty } from "@akasha/pages/url-property"

export type CalendarEventExternalLink = string

export const calendarEventExternalLink = {
  id: "01a06868-aec4-75d2-a847-12fbe07cf625",
  pageTypeSlug: "url-property",
  type: "url-property",
  slug: "calendar-event-external-link",
  propertySlug: "external-link",
  definition: "the address an event is at on its source",
  maxLength: 200,
} as const satisfies UrlProperty
