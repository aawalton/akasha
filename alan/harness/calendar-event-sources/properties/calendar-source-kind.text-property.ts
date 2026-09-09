import type { TextProperty } from "@akasha/pages/text-property"

export type CalendarSourceKind = string

export const calendarSourceKind = {
  id: "01a06868-aec4-7987-b34c-a810ee9895a7",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "calendar-source-kind",
  propertySlug: "kind",
  definition: "the sort of calendar a source publishes",
  maxLength: 400,
  nameFormat: null,
} as const satisfies TextProperty
