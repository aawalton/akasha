import type { Command } from "akasha/command/command.page-type.types.ts"

export const googleCalendarEventList = {
  id: "01a08cf5-2233-7c51-b38b-a79082d4dc82",
  type: "page-type/command",
  slug: "google-calendar-event-list",
  definition: "the command answering the events a calendar holds in a window",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The events this answers with are reported as JSON.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call naming no calendar acts on Alan's own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "This reaches the calendar as the account akasha runs under.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a calendar the call does not name or Alan does not own.",
    },
  ],
  name: "list",
  arguments: [
    { argument: "argument/calendar" },
    { argument: "argument/window-from" },
    { argument: "argument/window-to" },
    { argument: "argument/event-query" },
    { argument: "argument/max" },
  ],
} as const satisfies Command
