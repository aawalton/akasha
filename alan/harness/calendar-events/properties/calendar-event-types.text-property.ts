import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type CalendarEventTypes = readonly string[]

export const calendarEventTypes = {
  id: "01a06868-aec4-7846-bbd7-7b97323a1bd2",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "calendar-event-types",
  propertySlug: "event-types",
  definition: "the sorts a source files an event under",
  maxLength: 400,
  nameFormat: null,
} as const satisfies TextProperty
