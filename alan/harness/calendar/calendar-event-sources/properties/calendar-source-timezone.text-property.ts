import type { TextProperty } from "@akasha/pages/text-property"

export type CalendarSourceTimezone = string

export const calendarSourceTimezone = {
  id: "01a06868-aec4-799d-8130-9688b20ebb8f",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "calendar-source-timezone",
  propertySlug: "timezone",
  definition: "the zone a source states its times in",
  maxLength: 400,
  nameFormat: null,
} as const satisfies TextProperty
