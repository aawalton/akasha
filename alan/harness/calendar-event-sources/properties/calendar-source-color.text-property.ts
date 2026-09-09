import type { TextProperty } from "@akasha/pages/text-property"

export type CalendarSourceColor = string

export const calendarSourceColor = {
  id: "01a06868-aec4-7148-a283-0d6ddd855f21",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "calendar-source-color",
  propertySlug: "color",
  definition: "the color a source's events are shown in",
  maxLength: 400,
  nameFormat: null,
} as const satisfies TextProperty
