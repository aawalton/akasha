import type { Namespace } from "../../../../namespaces/namespace.page-type.types.ts"

export const googleCalendarEvents = {
  id: "01a08cf6-9dc4-7aa5-9293-19e026970755",
  pageTypeSlug: "namespace",
  type: "namespace",
  slug: "google-calendar-events",
  definition: "the events a calendar holds",
  parts: [
    "command/google-calendar-events-create",
    "command/google-calendar-events-delete",
    "command/google-calendar-events-get",
    "command/google-calendar-events-list",
    "command/google-calendar-events-rsvp",
    "command/google-calendar-events-update",
  ],
} as const satisfies Namespace
