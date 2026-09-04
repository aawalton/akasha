import type { CalendarDateProperty } from "@akasha/pages-system/calendar-date-property"

export type WorkoutSessionDate = string

export const workoutSessionDate = {
  id: "01a06580-5ee5-7026-80a1-3af0e898df07",
  pageTypeSlug: "calendar-date-property",
  slug: "workout-session-date",
  propertySlug: "workout-session-date",
  definition: "the day Alan trained",
} as const satisfies CalendarDateProperty
