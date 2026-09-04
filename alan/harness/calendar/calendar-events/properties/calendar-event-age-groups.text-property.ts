import type { TextProperty } from "@akasha/pages-system/text-property"

export type CalendarEventAgeGroups = readonly string[]

export const calendarEventAgeGroups = {
  id: "01a06868-aec4-7226-895a-7c52ac372704",
  pageTypeSlug: "text-property",
  slug: "calendar-event-age-groups",
  propertySlug: "age-groups",
  definition: "the ages an event is meant for",
  max: 400,
  nameFormatSlug: null,
} as const satisfies TextProperty
