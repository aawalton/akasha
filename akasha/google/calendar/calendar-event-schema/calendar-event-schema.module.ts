import type { Module } from "../../../code-system/module/module.page-type.ts"

export const calendarEventSchema = {
  id: "01a05c02-c735-7f12-9984-13c4709e141f",
  pageTypeSlug: "module",
  slug: "calendar-event-schema",
  definition: "how a calendar event is read off Google and written back to it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A boundary carrying a date alone makes an all-day event.",
    },
    {
      invariantKind: "departure",
      statement: "A start and an end are both all-day boundaries or both boundaries carry a time.",
    },
    {
      invariantKind: "departure",
      statement: "An all-day event is given no zone.",
    },
    {
      invariantKind: "departure",
      statement: "A recurrence rule is written with its `RRULE:` prefix exactly once.",
    },
    {
      invariantKind: "departure",
      statement: "A field Google sends that is not asked for is kept rather than dropped.",
    },
  ],
} as const satisfies Module
