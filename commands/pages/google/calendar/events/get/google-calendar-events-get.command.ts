import type { Command } from "../../../../../command.page-type.types.ts"

export const googleCalendarEventsGet = {
  id: "01a08cf5-5976-7c3e-a88b-e0c49e11367a",
  pageTypeSlug: "command",
  type: "command",
  slug: "google-calendar-events-get",
  definition: "the act answering one event named by its id",
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
    "the event answered with is reported as JSON.",
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
} as const satisfies Command
