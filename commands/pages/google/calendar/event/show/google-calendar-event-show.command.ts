import type { Command } from "akasha/commands/command.page-type.types.ts"

export const googleCalendarEventShow = {
  id: "01a08cf5-5976-7c3e-a88b-e0c49e11367a",
  type: "command",
  slug: "google-calendar-event-show",
  definition: "the command answering one event named by its id",
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
  invariants: [
    {
      invariantKind: "departure",
      statement: "The event this answers with is reported as JSON.",
    },
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
  name: "show",
} as const satisfies Command
