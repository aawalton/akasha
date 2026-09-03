import type { CalendarDateProperty } from "@akasha/pages-system/calendar-date-property"

export type EndDate = string

export const endDate = {
  id: "01a06575-c2c0-7ab4-a4f9-89d4ebba10eb",
  pageTypeSlug: "calendar-date-property",
  slug: "end-date",
  propertySlug: "end-date",
  definition: "the day a life theme was set down",
} as const satisfies CalendarDateProperty
