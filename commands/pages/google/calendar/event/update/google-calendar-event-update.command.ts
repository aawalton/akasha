import type { Command } from "akasha/commands/command.page-type.types.ts"

export const googleCalendarEventUpdate = {
  id: "01a08cf6-2498-7264-92b4-a12c680c958c",
  type: "command",
  slug: "google-calendar-event-update",
  definition: "the command changing the fields a call names on one event",
  code: "ts",
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
    {
      invariantKind: "departure",
      statement: "A call that threw after the calendar took the change says the calendar took it.",
    },
    {
      invariantKind: "departure",
      statement: "The attendees a call names take the place of whoever attends now.",
    },
  ],
  name: "update",
  arguments: [
    { argument: "argument/event", required: true, saidAs: "flag-or-word" },
    { argument: "argument/calendar" },
    { argument: "argument/send-updates" },
    { argument: "argument/summary" },
    { argument: "argument/start" },
    { argument: "argument/end" },
    { argument: "argument/description" },
    { argument: "argument/location" },
    { argument: "argument/attendees" },
    { argument: "argument/timezone" },
    { argument: "argument/recurrence", repeats: true },
  ],
} as const satisfies Command
