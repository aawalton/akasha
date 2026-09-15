import type { Command } from "akasha/command/command.page-type.types.ts"

export const googleCalendarEventDelete = {
  id: "01a08cf5-8fad-7e36-be9f-9248e12362cb",
  type: "page-type/command",
  slug: "google-calendar-event-delete",
  definition: "the command taking one event off its calendar",
  code: "ts",
  test: "ts",

  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An event named in place and as a flag is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call naming no calendar acts on Alan's own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "This reaches the calendar as the account akasha runs under.",
    },
  ],
  name: "delete",
  arguments: [
    { argument: "argument/event", required: true, saidAs: "flag-or-word" },
    { argument: "argument/calendar" },
  ],
} as const satisfies Command
