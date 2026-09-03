import type { CalendarDateProperty } from "@akasha/pages-system/calendar-date-property"

export type AppearanceExperimentDay = string

export const appearanceExperimentDay = {
  id: "01a0685d-b81e-7cb2-9b2d-be90f45697ac",
  pageTypeSlug: "calendar-date-property",
  slug: "appearance-experiment-day",
  propertySlug: "date",
  definition: "the day Alan put the thing on",
} as const satisfies CalendarDateProperty
