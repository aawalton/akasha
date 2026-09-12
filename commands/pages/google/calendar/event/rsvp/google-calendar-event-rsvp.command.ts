import type { Command } from "akasha/commands/command.page-type.types.ts"

export const googleCalendarEventRsvp = {
  id: "01a08cf6-67b1-7524-ab4b-2d55fdf0d2cb",
  type: "command",
  slug: "google-calendar-event-rsvp",
  definition: "the command setting Alan's own response on one event",
  code: "ts",
  taking: [
    {
      said: "--status <status>",
      takes: "the response to set, of `accepted`, `declined` and `tentative`",
    },
    {
      said: "--send-updates <who>",
      takes: "who is emailed about the response, of `all`, `externalOnly` and `none`",
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
      statement: "This reaches the calendar as Alan.",
    },
    {
      invariantKind: "departure",
      statement:
        "An rsvp turns Alan's own response and leaves every other guest's response as that response is.",
    },
    {
      invariantKind: "departure",
      statement: "Everyone attending is emailed unless the call says who to email instead.",
    },
  ],
  name: "rsvp",
  arguments: [
    { argument: "argument/event", required: true, saidAs: "flag-or-word" },
    { argument: "argument/calendar" },
  ],
} as const satisfies Command
