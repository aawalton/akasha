import type { Command } from "akasha/commands/command.page-type.types.ts"

export const googleCalendarEventCreate = {
  id: "01a08cf5-d6aa-73ba-98ee-cf689f633831",
  type: "command",
  slug: "google-calendar-event-create",
  definition: "the command placing a new event and inviting everyone named on it",
  code: "ts",
  taking: [
    { said: "--summary <text>", takes: "the event's title" },
    { said: "--start <iso>", takes: "when the event opens, as a timestamp or as a date alone" },
    { said: "--end <iso>", takes: "when the event closes, as a timestamp or as a date alone" },
    { said: "--description <text>", takes: "the event's description" },
    { said: "--location <text>", takes: "the event's location" },
    { said: "--attendees <emails>", takes: "who attends, parted by commas" },
    {
      said: "--timezone <iana>",
      takes: "the IANA zone a start and an end carrying none are read in",
    },
    {
      said: "--recurrence <rrule>",
      takes: "one RRULE body, said once over for each rule it carries",
    },
    {
      said: "--send-updates <who>",
      takes: "who is emailed about the event, of `all`, `externalOnly` and `none`",
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "This reaches the calendar as Alan.",
    },
    {
      invariantKind: "departure",
      statement: "A start and an end are both a date alone or both a timestamp.",
    },
    {
      invariantKind: "departure",
      statement: "A start and an end each a date alone is a whole-day event.",
    },
    {
      invariantKind: "departure",
      statement: "The event this answers with is reported as JSON.",
    },
    {
      invariantKind: "departure",
      statement: "A whole-day event's end is the day after the last day the event covers.",
    },
    {
      invariantKind: "departure",
      statement: "A zone is an IANA name rather than a raw offset.",
    },
    {
      invariantKind: "departure",
      statement: "A whole-day event has no zone.",
    },
    {
      invariantKind: "departure",
      statement: "A recurrence rule is said once over for each rule rather than parted by commas.",
    },
    {
      invariantKind: "departure",
      statement: "Everyone attending is emailed unless the call says who to email instead.",
    },
  ],
  name: "create",
  arguments: [{ argument: "argument/calendar" }],
} as const satisfies Command
