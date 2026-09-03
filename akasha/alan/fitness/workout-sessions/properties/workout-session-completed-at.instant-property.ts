import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type WorkoutSessionCompletedAt = string

export const workoutSessionCompletedAt = {
  id: "01a06580-5ee5-7283-90b6-d6fb73dc2d9a",
  pageTypeSlug: "instant-property",
  slug: "workout-session-completed-at",
  propertySlug: "workout-session-completed-at",
  definition: "when the session was closed",
} as const satisfies InstantProperty
