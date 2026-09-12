import type { Command } from "akasha/commands/command.page-type.types.ts"

export const googleCalendarEventUpdate = {
  id: "01a08cf6-2498-7264-92b4-a12c680c958c",
  type: "command",
  slug: "google-calendar-event-update",
  definition: "the command changing the fields a call names on one event",
  code: "ts",
  changeKind: "change-none",
  taking: [
    { said: "<id>", takes: "the event to act on, said in place" },
    { said: "--event <id>", takes: "the event to act on, said as a flag rather than in place" },
    {
      said: "--calendar <id>",
      takes: "the calendar to act on, where `primary` and saying nothing both name Alan's own",
    },
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
  helpNotes: [
    "an event is named in place or as a flag, and naming it both ways over is refused.",
    "this reaches the calendar as Alan, so the invites carry his name.",
    "an update changes the fields the call names and leaves every other field as it is.",
    "a zone is an IANA name rather than an offset, and a whole-day event carries none.",
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
} as const satisfies Command
