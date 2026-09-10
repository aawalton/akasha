import type { CalendarDateProperty } from "akasha/pages/calendar-date-properties/calendar-date-property.page-type.types.ts"

export type LastSyncedAt = string

export const lastSyncedAt = {
  id: "01a063de-2c60-701f-a275-5b8d3b2d03bb",
  pageTypeSlug: "calendar-date-property",
  type: "calendar-date-property",
  slug: "last-synced-at",
  propertySlug: "last-synced-at",
  definition: "the day a collection was last read from its source",
} as const satisfies CalendarDateProperty
