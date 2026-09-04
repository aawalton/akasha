import type { UrlProperty } from "@akasha/pages-system/url-property"

export type CalendarEventExternalLink = string

export const calendarEventExternalLink = {
  id: "01a06868-aec4-75d2-a847-12fbe07cf625",
  pageTypeSlug: "url-property",
  slug: "calendar-event-external-link",
  propertySlug: "external-link",
  definition: "the address an event stands at on its source",
  max: 200,
} as const satisfies UrlProperty
