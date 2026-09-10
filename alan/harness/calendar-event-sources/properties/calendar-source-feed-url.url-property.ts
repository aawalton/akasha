import type { UrlProperty } from "akasha/pages/url-properties/url-property.page-type.types.ts"

export type CalendarSourceFeedUrl = string

export const calendarSourceFeedUrl = {
  id: "01a06868-aec4-7a9e-ad04-33ba9a30cb17",
  pageTypeSlug: "url-property",
  type: "url-property",
  slug: "calendar-source-feed-url",
  propertySlug: "feed-url",
  definition: "the address a source publishes its events at",
  maxLength: 400,
} as const satisfies UrlProperty
