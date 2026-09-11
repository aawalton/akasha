import type { Command } from "akasha/commands/command.page-type.types.ts"

export const googleCalendarEventsRsvp = {
  id: "01a08cf6-67b1-7524-ab4b-2d55fdf0d2cb",
  type: "command",
  slug: "google-calendar-events-rsvp",
  definition: "the act setting Alan's own response on one event",
  code: "ts",
  changeKind: "change-none",
  taking: [
    { said: "<id>", takes: "the event to act on, said in place" },
    { said: "--event <id>", takes: "the event to act on, said as a flag rather than in place" },
    {
      said: "--calendar <id>",
      takes: "the calendar to act on, where `primary` and saying nothing both name Alan's own",
    },
    {
      said: "--status <status>",
      takes: "the response to set, of `accepted`, `declined` and `tentative`",
    },
    {
      said: "--send-updates <who>",
      takes: "who is emailed about the response, of `all`, `externalOnly` and `none`",
    },
  ],
  helpNotes: [
    "an event is named in place or as a flag, and naming it both ways over is refused.",
    "this reaches the calendar as Alan, so the response carries his name.",
    "the whole guest list is written back with Alan's response alone turned.",
    "the event answered with is reported as JSON.",
  ],
  invariants: [
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
} as const satisfies Command
