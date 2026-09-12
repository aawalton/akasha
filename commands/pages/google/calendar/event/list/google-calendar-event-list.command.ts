import type { Command } from "akasha/commands/command.page-type.types.ts"

export const googleCalendarEventList = {
  id: "01a08cf5-2233-7c51-b38b-a79082d4dc82",
  type: "command",
  slug: "google-calendar-event-list",
  definition: "the command answering the events a calendar holds in a window",
  code: "ts",
  taking: [{ said: "--to <iso>", takes: "where the window closes" }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The events this answers with are reported as JSON.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no calendar acts on Alan's own.",
    },
    {
      invariantKind: "departure",
      statement: "This reaches the calendar as the account akasha runs under.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a calendar the call does not name or Alan does not own.",
    },
  ],
  name: "list",
  arguments: [
    { argument: "argument/calendar" },
    { argument: "argument/window-from" },
    { argument: "argument/event-query" },
    { argument: "argument/max" },
  ],
} as const satisfies Command
