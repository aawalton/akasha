import type { CalendarDateProperty } from "@akasha/pages-system/calendar-date-property"

export type ExerciseLastSyncedAt = string

export const exerciseLastSyncedAt = {
  id: "01a0657b-1ad2-7298-8b8d-b8f670f482ac",
  pageTypeSlug: "calendar-date-property",
  slug: "exercise-last-synced-at",
  propertySlug: "exercise-last-synced-at",
  definition: "when the catalogue this movement came from was last read",
} as const satisfies CalendarDateProperty
