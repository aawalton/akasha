import type { UrlProperty } from "@akasha/pages-system/url-property"

export type CalendarSourceBaseUrl = string

export const calendarSourceBaseUrl = {
  id: "01a06868-aec4-72e1-b03b-cbdc2b26c1b6",
  pageTypeSlug: "url-property",
  slug: "calendar-source-base-url",
  propertySlug: "base-url",
  definition: "the address a source's own pages stand under",
} as const satisfies UrlProperty
