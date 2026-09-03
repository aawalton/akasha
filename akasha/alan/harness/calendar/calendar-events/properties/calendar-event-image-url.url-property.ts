import type { UrlProperty } from "@akasha/pages-system/url-property"

export type CalendarEventImageUrl = string

export const calendarEventImageUrl = {
  id: "01a06868-aec4-70c7-8d8f-af8e080636ce",
  pageTypeSlug: "url-property",
  slug: "calendar-event-image-url",
  propertySlug: "image-url",
  definition: "the picture a source shows an event under",
} as const satisfies UrlProperty
