import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type WorkoutScheduleActive = boolean

export const workoutScheduleActive = {
  id: "01a0657a-e618-7f88-a1cf-c931852836a4",
  pageTypeSlug: "boolean-property",
  slug: "workout-schedule-active",
  propertySlug: "workout-schedule-active",
  definition: "whether this is the rotation Alan is training on now",
} as const satisfies BooleanProperty
