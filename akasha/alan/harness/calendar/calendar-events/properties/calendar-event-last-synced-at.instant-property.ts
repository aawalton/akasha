import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type CalendarEventLastSyncedAt = string

export const calendarEventLastSyncedAt = {
  id: "01a06868-aec4-7dfa-9b33-0e7381465ce8",
  pageTypeSlug: "instant-property",
  slug: "calendar-event-last-synced-at",
  propertySlug: "last-synced-at",
  definition: "when an event was last read off its source",
} as const satisfies InstantProperty
