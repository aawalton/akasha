import type { TextProperty } from "@akasha/pages-system/text-property"

export type CalendarSourceExternalId = string

export const calendarSourceExternalId = {
  id: "01a06868-aec4-78b7-a22c-6e837c78c191",
  pageTypeSlug: "text-property",
  slug: "calendar-source-external-id",
  propertySlug: "external-id",
  definition: "the id a calendar source gives itself",
  max: 400,
  nameFormatSlug: null,
} as const satisfies TextProperty
