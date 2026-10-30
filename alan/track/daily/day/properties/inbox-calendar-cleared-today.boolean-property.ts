import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const inboxCalendarClearedToday = {
  id: "01a05fd8-c30f-725b-9cbf-9cdf61e620ee",
  type: "page-type/boolean-property",
  slug: "inbox-calendar-cleared-today",
  propertySlug: "inbox-calendar-cleared-today",
  definition:
    "whether the calendar invitations that wait for a reply from Alan reached zero on a day",
  types: "ts",
  createdAt: "2026-09-02T02:00:36.367Z",
  updatedAt: "2026-10-30T16:35:08.337Z",
} as const satisfies BooleanProperty
