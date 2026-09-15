import type { Command } from "akasha/command/command.page-type.types.ts"

export const googleCalendarEventRsvp = {
  id: "01a08cf6-67b1-7524-ab4b-2d55fdf0d2cb",
  type: "command",
  slug: "google-calendar-event-rsvp",
  definition: "the command setting Alan's own response on one event",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The event this answers with is reported as JSON.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An event named in place and as a flag is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "This reaches the calendar as Alan.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An rsvp turns Alan's own response and leaves every other guest's response as that response is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Everyone attending is emailed unless the call says who to email instead.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call that threw after the calendar took the answer says the calendar took it.",
    },
  ],
  name: "rsvp",
  arguments: [
    { argument: "argument/event", required: true, saidAs: "flag-or-word" },
    { argument: "argument/calendar" },
    { argument: "argument/send-updates" },
    { argument: "argument/status", required: true },
  ],
} as const satisfies Command
