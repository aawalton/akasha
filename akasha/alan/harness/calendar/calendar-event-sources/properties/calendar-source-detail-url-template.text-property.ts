import type { TextProperty } from "@akasha/pages-system/text-property"

export type CalendarSourceDetailUrlTemplate = string

export const calendarSourceDetailUrlTemplate = {
  id: "01a06868-aec4-7c9c-9f33-bc89ad5421ba",
  pageTypeSlug: "text-property",
  slug: "calendar-source-detail-url-template",
  propertySlug: "detail-url-template",
  definition: "the address of one event, with the event's id left open",
  max: 400,
  nameFormatSlug: null,
} as const satisfies TextProperty
