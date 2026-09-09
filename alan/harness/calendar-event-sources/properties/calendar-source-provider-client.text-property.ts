import type { TextProperty } from "@akasha/pages/text-property"

export type CalendarSourceProviderClient = string

export const calendarSourceProviderClient = {
  id: "01a06868-aec4-7bfe-829d-9d2c2066ea7f",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "calendar-source-provider-client",
  propertySlug: "provider-client",
  definition: "the client that knows how to read a source",
  maxLength: 400,
  nameFormat: null,
} as const satisfies TextProperty
