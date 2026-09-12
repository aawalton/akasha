import type { Command } from "akasha/commands/command.page-type.types.ts"

export const googleCalendarEventsList = {
  id: "01a08cf5-2233-7c51-b38b-a79082d4dc82",
  type: "command",
  slug: "google-calendar-events-list",
  definition: "the command answering the events a calendar holds in a window",
  code: "ts",
  changeKind: "change-none",
  taking: [
    {
      said: "--calendar <id>",
      takes: "the calendar to act on, where `primary` and saying nothing both name Alan's own",
    },
    { said: "--from <iso>", takes: "where the window opens" },
    { said: "--to <iso>", takes: "where the window closes" },
    { said: "--query <text>", takes: "the text an event is kept for" },
    { said: "--max <n>", takes: "how many events this answers with at most" },
  ],
  helpNotes: [
    "this reaches the calendar as the account akasha runs under rather than as Alan.",
    "the events answered with are reported as JSON.",
  ],
  invariants: [
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
} as const satisfies Command
