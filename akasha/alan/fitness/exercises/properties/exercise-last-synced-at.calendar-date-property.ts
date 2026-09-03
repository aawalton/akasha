import type { CalendarDateProperty } from "@akasha/pages-system/calendar-date-property"

export type ExerciseLastSyncedAt = string

export const exerciseLastSyncedAt = {
  id: "01a0657e-2bbf-72ed-b520-2fd61ed091b7",
  pageTypeSlug: "calendar-date-property",
  slug: "exercise-last-synced-at",
  propertySlug: "exercise-last-synced-at",
  definition: "when the catalogue this movement came from was last read",
} as const satisfies CalendarDateProperty
