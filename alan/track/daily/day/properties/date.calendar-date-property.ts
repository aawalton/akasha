import type { CalendarDateProperty } from "akasha/page/calendar-date-property/calendar-date-property.page-type.types.ts"

export const date = {
  id: "01a0cb49-b4b8-7b74-ae74-fdad9f14278b",
  type: "page-type/calendar-date-property",
  slug: "date",
  propertySlug: "date",
  definition: "a record's day",
  types: "ts",
} as const satisfies CalendarDateProperty
