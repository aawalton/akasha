import type { CalendarDateProperty } from "akasha/pages/calendar-date-properties/calendar-date-property.page-type.types.ts"

export const publishedDay = {
  id: "01a063de-2c60-700d-bcfb-7ad4104196ad",
  type: "calendar-date-property",
  slug: "published-day",
  propertySlug: "published-day",
  definition: "the day a collection was released",
  types: "ts",
} as const satisfies CalendarDateProperty
