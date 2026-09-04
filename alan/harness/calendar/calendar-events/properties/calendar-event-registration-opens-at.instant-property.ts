import type { InstantProperty } from "@akasha/pages-system/instant-property"

export type CalendarEventRegistrationOpensAt = string

export const calendarEventRegistrationOpensAt = {
  id: "01a06868-aec4-79ee-a836-f52b713e6108",
  pageTypeSlug: "instant-property",
  slug: "calendar-event-registration-opens-at",
  propertySlug: "registration-opens-at",
  definition: "when places at an event may first be taken",
} as const satisfies InstantProperty
