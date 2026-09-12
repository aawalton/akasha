import type { Command } from "akasha/commands/command.page-type.types.ts"

export const googleCalendarEventDelete = {
  id: "01a08cf5-8fad-7e36-be9f-9248e12362cb",
  type: "command",
  slug: "google-calendar-event-delete",
  definition: "the command taking one event off its calendar",
  code: "ts",
  changeKind: "change-none",
  taking: [
    { said: "<id>", takes: "the event to act on, said in place" },
    { said: "--event <id>", takes: "the event to act on, said as a flag rather than in place" },
    {
      said: "--calendar <id>",
      takes: "the calendar to act on, where `primary` and saying nothing both name Alan's own",
    },
  ],
  helpNotes: [
    "an event is named in place or as a flag, and naming it both ways over is refused.",
    "this reaches the calendar as the account akasha runs under rather than as Alan.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An event named in place and as a flag is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no calendar acts on Alan's own.",
    },
    {
      invariantKind: "departure",
      statement: "This reaches the calendar as the account akasha runs under.",
    },
  ],
  name: "delete",
} as const satisfies Command
