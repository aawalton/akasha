import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const googleCalendar = {
  id: "01a05c02-c732-7b6e-b180-61f29e1b42e7",
  type: "page-type/domain",
  slug: "google-calendar",
  definition: "Alan's Google calendar",
  parts: [
    "module/calendar-auth",
    "module/calendar-client",
    "module/calendar-credentials",
    "module/calendar-event-schema",
    "module/calendar-event-shapes",
    "module/calendar-events",
    "module/send-updates-narrowing",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An event naming no calendar lands on Alan's own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Attendees are emailed unless the caller says otherwise.",
    },
  ],
} as const satisfies Domain
