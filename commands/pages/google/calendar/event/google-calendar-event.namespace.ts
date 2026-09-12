import type { Namespace } from "akasha/commands/namespaces/namespace.page-type.types.ts"

export const googleCalendarEvent = {
  id: "01a08cf6-9dc4-7aa5-9293-19e026970755",
  type: "namespace",
  slug: "google-calendar-event",
  definition: "an event a calendar holds",
  parts: [
    "command/google-calendar-event-create",
    "command/google-calendar-event-delete",
    "command/google-calendar-event-list",
    "command/google-calendar-event-rsvp",
    "command/google-calendar-event-show",
    "command/google-calendar-event-update",
  ],
  name: "event",
} as const satisfies Namespace
