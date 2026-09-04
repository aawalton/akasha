import type { Command } from "../../command-system/commands/command.page-type.ts"

export const calendar = {
  id: "01a06809-e6ee-7c9b-8778-5da992d3080f",
  pageTypeSlug: "command",
  slug: "calendar",
  definition: "the command acting on Alan's Google calendar and the events standing on it",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    {
      said: "auth",
      takes: "what to act on, which is the consent a calendar is reached as Alan on",
    },
    {
      said: "login",
      takes: "the act, which is to grant that consent once and mint a refresh token",
    },
    {
      said: "--callback-url <url>",
      takes:
        "the callback URL pasted from the browser, where the loopback listener cannot be reached",
    },
    { said: "events", takes: "what to act on, which is the events a calendar holds" },
    { said: "list", takes: "the act, which is to answer the events standing in a window" },
    { said: "get", takes: "the act, which is to answer one event named by its id" },
    {
      said: "create",
      takes: "the act, which is to place a new event and invite everyone named on it",
    },
    { said: "update", takes: "the act, which is to change the fields the call names on one event" },
    { said: "delete", takes: "the act, which is to take one event off its calendar" },
    { said: "rsvp", takes: "the act, which is to set Alan's own response on one event" },
    { said: "<id>", takes: "the event to act on, said in place after the act" },
    { said: "--event <id>", takes: "the event to act on, said as a flag rather than in place" },
    {
      said: "--calendar <id>",
      takes: "the calendar to act on, where `primary` and saying nothing both name Alan's own",
    },
    { said: "--from <iso>", takes: "where a list's window opens" },
    { said: "--to <iso>", takes: "where a list's window closes" },
    { said: "--query <text>", takes: "the text a list keeps an event for" },
    { said: "--max <n>", takes: "how many events a list answers with at most" },
    { said: "--summary <text>", takes: "the event's title" },
    { said: "--start <iso>", takes: "when the event opens, as a timestamp or as a date alone" },
    { said: "--end <iso>", takes: "when the event closes, as a timestamp or as a date alone" },
    { said: "--description <text>", takes: "the event's description" },
    { said: "--location <text>", takes: "the event's location" },
    {
      said: "--attendees <emails>",
      takes: "who attends, parted by commas, standing in place of whoever attends now",
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
    {
      said: "--status <status>",
      takes: "the response to set, of `accepted`, `declined` and `tentative`",
    },
  ],
  helpNotes: [
    "the words stand in order, and one call names one act.",
    "an event is named in place after the act or as a flag, and naming it both ways over is refused.",
    "create, update and rsvp reach the calendar as Alan, so the invites and the responses carry his name.",
    "get, list and delete reach the calendar as the account akasha runs under rather than as Alan.",
    "the consent create, update and rsvp lean on is granted once by the login act.",
    "a date alone at both ends is a whole-day event, and its end is the day after the last day it covers.",
    "a zone is an IANA name rather than an offset, and a whole-day event carries none.",
    "an update changes the fields the call names and leaves every other field standing.",
    "an rsvp writes the whole guest list back with Alan's response alone turned.",
    "an event an act answered with is reported as JSON.",
    "the minted refresh token is written to stdout by the consent round trip rather than answered here.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "What to act on is the first word and the act is the second.",
    },
    {
      invariantKind: "departure",
      statement: "An event is named in place or as a flag rather than as both.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no calendar acts on Alan's own.",
    },
    {
      invariantKind: "departure",
      statement: "An act that writes an event reaches the calendar as Alan.",
    },
    {
      invariantKind: "departure",
      statement: "An act that only reads reaches the calendar as the account akasha runs under.",
    },
    {
      invariantKind: "departure",
      statement: "A start and an end are both a date alone or both a timestamp.",
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
      statement: "A whole-day event carries no zone.",
    },
    {
      invariantKind: "departure",
      statement: "An update leaves every field the call does not name standing as it stands.",
    },
    {
      invariantKind: "departure",
      statement: "A recurrence rule is said once over for each rule rather than parted by commas.",
    },
    {
      invariantKind: "departure",
      statement: "An rsvp turns Alan's own response and leaves every other guest's standing.",
    },
    {
      invariantKind: "departure",
      statement: "Everyone attending is emailed unless the call says who to email instead.",
    },
    {
      invariantKind: "departure",
      statement: "A minted refresh token is written out and held nowhere.",
    },
    {
      invariantKind: "departure",
      statement: "A flag standing under an act that does not take it is refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a calendar the call does not name or Alan does not own.",
    },
  ],
} as const satisfies Command
