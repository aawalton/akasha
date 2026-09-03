import type { NumberProperty } from "@akasha/pages-system/number-property"

export type CalendarEventMaxAttendees = number

export const calendarEventMaxAttendees = {
  id: "01a06868-aec4-74dc-ba62-1808b5194318",
  pageTypeSlug: "number-property",
  slug: "calendar-event-max-attendees",
  propertySlug: "max-attendees",
  definition: "the most people an event takes",
  max: null,
} as const satisfies NumberProperty
