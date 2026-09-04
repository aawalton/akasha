import type { NumberProperty } from "@akasha/pages-system/number-property"

export type InboxCalendar = number

export const inboxCalendar = {
  id: "01a05fd8-c30f-7a59-9f28-a980a25644ee",
  pageTypeSlug: "number-property",
  slug: "inbox-calendar",
  propertySlug: "inbox-calendar",
  definition: "the invitations left unanswered at the end of a day",
  max: null,
} as const satisfies NumberProperty
