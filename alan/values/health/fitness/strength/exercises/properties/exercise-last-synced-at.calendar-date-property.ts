import type { CalendarDateProperty } from "akasha/pages/calendar-date-properties/calendar-date-property.page-type.types.ts"

export const exerciseLastSyncedAt = {
  id: "01a0657e-2bbf-72ed-b520-2fd61ed091b7",
  type: "calendar-date-property",
  slug: "exercise-last-synced-at",
  propertySlug: "exercise-last-synced-at",
  definition: "when the catalogue this movement came from was last read",
  types: "ts",
} as const satisfies CalendarDateProperty
