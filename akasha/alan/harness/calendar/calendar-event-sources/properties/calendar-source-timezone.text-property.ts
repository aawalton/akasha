import type { TextProperty } from "@akasha/pages-system/text-property"

export type CalendarSourceTimezone = string

export const calendarSourceTimezone = {
  id: "01a06868-aec4-799d-8130-9688b20ebb8f",
  pageTypeSlug: "text-property",
  slug: "calendar-source-timezone",
  propertySlug: "timezone",
  definition: "the zone a source states its times in",
  max: 400,
  nameFormatSlug: null,
} as const satisfies TextProperty
