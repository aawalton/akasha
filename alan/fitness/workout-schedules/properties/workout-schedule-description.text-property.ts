import type { TextProperty } from "@akasha/pages-system/text-property"

export type WorkoutScheduleDescription = string

export const workoutScheduleDescription = {
  id: "01a0657a-e619-70b2-93f1-a901ab25ea77",
  pageTypeSlug: "text-property",
  slug: "workout-schedule-description",
  propertySlug: "workout-schedule-description",
  definition: "how the rotation is meant to run",
  max: 50,
  nameFormatSlug: null,
} as const satisfies TextProperty
