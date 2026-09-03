import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type CalendarEventRegistrationRequired = boolean

export const calendarEventRegistrationRequired = {
  id: "01a06868-aec4-78ab-8e03-c05ac9509862",
  pageTypeSlug: "boolean-property",
  slug: "calendar-event-registration-required",
  propertySlug: "registration-required",
  definition: "whether a place at an event is taken beforehand",
} as const satisfies BooleanProperty
