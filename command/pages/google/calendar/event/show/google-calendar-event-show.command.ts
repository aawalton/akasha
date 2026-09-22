import type { Command } from "akasha/command/command.page-type.types.ts"

export const googleCalendarEventShow = {
  id: "01a08cf5-5976-7c3e-a88b-e0c49e11367a",
  type: "page-type/command",
  slug: "google-calendar-event-show",
  definition: "the command answering an event named by its id",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The event this answers with is reported as JSON.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An event named in place and as a flag is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call naming no calendar acts on Alan's own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This reaches the calendar as the account akasha runs under.",
    },
  ],
  name: "show",
  arguments: [
    { argument: "argument/event", required: true, saidAs: "flag-or-word" },
    { argument: "argument/calendar" },
  ],
} as const satisfies Command
