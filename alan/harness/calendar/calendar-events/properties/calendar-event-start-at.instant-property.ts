import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type CalendarEventStartAt = string

export const calendarEventStartAt = {
  id: "01a06868-aec4-7de4-bd74-55f4eee1e04d",
  pageTypeSlug: "instant-property",
  slug: "calendar-event-start-at",
  propertySlug: "start-at",
  definition: "when an event begins",
} as const satisfies InstantProperty
