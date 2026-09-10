import type { UrlProperty } from "akasha/pages/url-properties/url-property.page-type.types.ts"

export const calendarEventRegistrationUrl = {
  id: "01a06868-aec4-74a6-87b5-95514debcf9d",
  pageTypeSlug: "url-property",
  type: "url-property",
  slug: "calendar-event-registration-url",
  propertySlug: "registration-url",
  definition: "the address a place at an event is taken at",
  maxLength: 200,
  types: "ts",
} as const satisfies UrlProperty
