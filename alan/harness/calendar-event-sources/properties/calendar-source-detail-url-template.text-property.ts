import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type CalendarSourceDetailUrlTemplate = string

export const calendarSourceDetailUrlTemplate = {
  id: "01a06868-aec4-7c9c-9f33-bc89ad5421ba",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "calendar-source-detail-url-template",
  propertySlug: "detail-url-template",
  definition: "the address of one event, with the event's id left open",
  maxLength: 400,
  nameFormat: null,
} as const satisfies TextProperty
