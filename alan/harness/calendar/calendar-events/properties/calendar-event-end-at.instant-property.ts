import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type CalendarEventEndAt = string

export const calendarEventEndAt = {
  id: "01a06868-aec4-7386-a7db-9506a52a5b2a",
  pageTypeSlug: "instant-property",
  slug: "calendar-event-end-at",
  propertySlug: "end-at",
  definition: "when an event ends",
} as const satisfies InstantProperty
