import type { CalendarDateProperty } from "akasha/pages/calendar-date-properties/calendar-date-property.page-type.types.ts"

export const appearanceExperimentDay = {
  id: "01a0685d-b81e-7cb2-9b2d-be90f45697ac",
  type: "calendar-date-property",
  slug: "appearance-experiment-day",
  propertySlug: "date",
  definition: "the day Alan put the thing on",
  types: "ts",
} as const satisfies CalendarDateProperty
