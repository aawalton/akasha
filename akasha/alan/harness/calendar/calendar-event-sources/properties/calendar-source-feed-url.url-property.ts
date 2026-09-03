import type { UrlProperty } from "@akasha/pages-system/url-property"

export type CalendarSourceFeedUrl = string

export const calendarSourceFeedUrl = {
  id: "01a06868-aec4-7a9e-ad04-33ba9a30cb17",
  pageTypeSlug: "url-property",
  slug: "calendar-source-feed-url",
  propertySlug: "feed-url",
  definition: "the address a source publishes its events at",
} as const satisfies UrlProperty
