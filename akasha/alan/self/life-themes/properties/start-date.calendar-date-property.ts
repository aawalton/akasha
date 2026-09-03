import type { CalendarDateProperty } from "@akasha/pages-system/calendar-date-property"

export type StartDate = string

export const startDate = {
  id: "01a06575-c2c0-7a7a-9050-6651320c7596",
  pageTypeSlug: "calendar-date-property",
  slug: "start-date",
  propertySlug: "start-date",
  definition: "the day a life theme was taken up",
} as const satisfies CalendarDateProperty
