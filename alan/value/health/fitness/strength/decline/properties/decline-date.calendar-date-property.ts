import type { CalendarDateProperty } from "akasha/page/calendar-date-property/calendar-date-property.page-type.types.ts"

export const declineDate = {
  id: "01a0b71d-4691-787b-a7c3-09f9bf7a60c8",
  type: "page-type/calendar-date-property",
  slug: "decline-date",
  propertySlug: "decline-date",
  definition: "the day Alan turned the movement down",
  types: "ts",
} as const satisfies CalendarDateProperty
