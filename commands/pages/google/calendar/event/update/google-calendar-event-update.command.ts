import type { Command } from "akasha/commands/command.page-type.types.ts"

export const googleCalendarEventUpdate = {
  id: "01a08cf6-2498-7264-92b4-a12c680c958c",
  type: "command",
  slug: "google-calendar-event-update",
  definition: "the command changing the fields a call names on one event",
  code: "ts",
  taking: [
    { said: "--summary <text>", takes: "the event's title" },
    { said: "--start <iso>", takes: "when the event opens, as a timestamp or as a date alone" },
    { said: "--end <iso>", takes: "when the event closes, as a timestamp or as a date alone" },
    { said: "--description <text>", takes: "the event's description" },
    { said: "--location <text>", takes: "the event's location" },
    {
      said: "--attendees <emails>",
      takes: "who attends, parted by commas, taking the place of whoever attends now",
    },
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
      takes: "who is emailed about the change, of `all`, `externalOnly` and `none`",
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A whole-day event has no zone.",
    },
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
      statement: "An update leaves every field the call does not name as that field is.",
    },
    {
      invariantKind: "departure",
      statement: "A start and an end are both a date alone or both a timestamp.",
    },
    {
      invariantKind: "departure",
      statement: "A zone is an IANA name rather than a raw offset.",
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
  name: "update",
  arguments: [
    { argument: "argument/event", required: true, saidAs: "flag-or-word" },
    { argument: "argument/calendar" },
  ],
} as const satisfies Command
