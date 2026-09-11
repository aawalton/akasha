import type { CalendarDateProperty } from "akasha/pages/calendar-date-properties/calendar-date-property.page-type.types.ts"

export const startsOn = {
  id: "01a0680b-2b00-7000-9a17-4d2c8e6f2101",
  type: "calendar-date-property",
  slug: "starts-on",
  propertySlug: "starts-on",
  definition: "the first day of the month a page covers",
  types: "ts",
} as const satisfies CalendarDateProperty
