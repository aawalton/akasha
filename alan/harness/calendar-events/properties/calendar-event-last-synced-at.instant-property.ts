import type { InstantProperty } from "akasha/pages/instant-properties/instant-property.page-type.types.ts"

export type CalendarEventLastSyncedAt = string

export const calendarEventLastSyncedAt = {
  id: "01a06868-aec4-7dfa-9b33-0e7381465ce8",
  pageTypeSlug: "instant-property",
  type: "instant-property",
  slug: "calendar-event-last-synced-at",
  propertySlug: "last-synced-at",
  definition: "when an event was last read off its source",
} as const satisfies InstantProperty
