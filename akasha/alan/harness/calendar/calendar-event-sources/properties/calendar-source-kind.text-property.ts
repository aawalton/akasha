import type { TextProperty } from "@akasha/pages-system/text-property"

export type CalendarSourceKind = string

export const calendarSourceKind = {
  id: "01a06868-aec4-7987-b34c-a810ee9895a7",
  pageTypeSlug: "text-property",
  slug: "calendar-source-kind",
  propertySlug: "kind",
  definition: "the sort of calendar a source publishes",
  max: 400,
  nameFormatSlug: null,
} as const satisfies TextProperty
