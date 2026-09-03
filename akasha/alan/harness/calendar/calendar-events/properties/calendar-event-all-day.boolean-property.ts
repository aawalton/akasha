import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type CalendarEventAllDay = boolean

export const calendarEventAllDay = {
  id: "01a06868-aec4-76a6-8df6-ca1382b5602a",
  pageTypeSlug: "boolean-property",
  slug: "calendar-event-all-day",
  propertySlug: "all-day",
  definition: "whether an event fills the day rather than a stretch of it",
} as const satisfies BooleanProperty
