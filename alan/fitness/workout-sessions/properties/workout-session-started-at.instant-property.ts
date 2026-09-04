import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type WorkoutSessionStartedAt = string

export const workoutSessionStartedAt = {
  id: "01a06580-5ee5-7519-8bca-0f2da14d77b3",
  pageTypeSlug: "instant-property",
  slug: "workout-session-started-at",
  propertySlug: "workout-session-started-at",
  definition: "when the session was opened",
} as const satisfies InstantProperty
