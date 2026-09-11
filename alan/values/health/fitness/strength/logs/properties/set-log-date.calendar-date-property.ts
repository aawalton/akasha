import type { CalendarDateProperty } from "akasha/pages/calendar-date-properties/calendar-date-property.page-type.types.ts"

export const setLogDate = {
  id: "01a08139-ae8e-7a9a-9107-9ee49dac240a",
  type: "calendar-date-property",
  slug: "set-log-date",
  propertySlug: "set-log-date",
  definition: "the day Alan performed the set",
  types: "ts",
} as const satisfies CalendarDateProperty
