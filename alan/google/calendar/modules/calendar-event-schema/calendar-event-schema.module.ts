import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const calendarEventSchema = {
  id: "01a05c02-c735-7f12-9984-13c4709e141f",
  type: "page-type/module",
  slug: "calendar-event-schema",
  definition: "how a calendar event is read off Google and written back to it",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A boundary with a date alone makes an all-day event.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An end is an all-day boundary where the start is an all-day boundary.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An end has a time where the start has a time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An all-day event is given no zone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A recurrence rule has no second `RRULE:` prefix.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A field Google sends that is not asked for is kept rather than dropped.",
    },
  ],
} as const satisfies Module
