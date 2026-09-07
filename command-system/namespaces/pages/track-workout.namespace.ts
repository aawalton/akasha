import type { Namespace } from "../namespace.page-type.ts"

export const trackWorkout = {
  id: "01a0798b-91ce-7baa-bd78-b5adbdfae9d3",
  pageTypeSlug: "namespace",
  slug: "track-workout",
  definition: "a workout and the sets recorded under that workout",
  partSlugs: [
    "command/track-workout-start",
    "command/track-workout-set",
    "command/track-workout-activity",
    "command/track-workout-finish",
    "command/track-workout-show",
  ],
} as const satisfies Namespace
