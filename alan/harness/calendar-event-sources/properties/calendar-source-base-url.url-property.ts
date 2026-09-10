import type { UrlProperty } from "akasha/pages/url-properties/url-property.page-type.types.ts"

export type CalendarSourceBaseUrl = string

export const calendarSourceBaseUrl = {
  id: "01a06868-aec4-72e1-b03b-cbdc2b26c1b6",
  pageTypeSlug: "url-property",
  type: "url-property",
  slug: "calendar-source-base-url",
  propertySlug: "base-url",
  definition: "the address a source's own pages sit under",
  maxLength: 200,
} as const satisfies UrlProperty
