import type { CalendarDateProperty } from "@akasha/pages-system/calendar-date-property"

export type PublishedDay = string

export const publishedDay = {
  id: "01a063de-2c60-700d-bcfb-7ad4104196ad",
  pageTypeSlug: "calendar-date-property",
  slug: "published-day",
  propertySlug: "published-day",
  definition: "the day a collection was released",
} as const satisfies CalendarDateProperty
