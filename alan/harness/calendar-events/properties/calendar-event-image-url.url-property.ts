import type { UrlProperty } from "akasha/pages/url-properties/url-property.page-type.types.ts"

export const calendarEventImageUrl = {
  id: "01a06868-aec4-70c7-8d8f-af8e080636ce",
  pageTypeSlug: "url-property",
  type: "url-property",
  slug: "calendar-event-image-url",
  propertySlug: "image-url",
  definition: "the picture a source shows an event under",
  maxLength: 200,
  types: "ts",
} as const satisfies UrlProperty
