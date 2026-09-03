import type { CalendarDateProperty } from "@akasha/pages-system/calendar-date-property"

export type StartsOn = string

export const startsOn = {
  id: "01a0680b-2b00-7000-9a17-4d2c8e6f2101",
  pageTypeSlug: "calendar-date-property",
  slug: "starts-on",
  propertySlug: "starts-on",
  definition: "the first day of the month a page covers",
} as const satisfies CalendarDateProperty
