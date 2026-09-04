import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type InboxCalendarClearedToday = boolean

export const inboxCalendarClearedToday = {
  id: "01a05fd8-c30f-725b-9cbf-9cdf61e620ee",
  pageTypeSlug: "boolean-property",
  slug: "inbox-calendar-cleared-today",
  propertySlug: "inbox-calendar-cleared-today",
  definition: "whether the invitations reached empty on a day",
} as const satisfies BooleanProperty
