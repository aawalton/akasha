import type { Command } from "@akasha/command-system/command"

export const exerciseToday = {
  id: "01a0685d-b7ab-71db-86ab-5d91f00a25e6",
  pageTypeSlug: "command",
  slug: "exercise-today",
  definition: "the command naming one day's scheduled focus and whether a session stands for it",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    {
      said: "--date <YYYY-MM-DD>",
      takes: "the day reported, the ESO logical day where none is said",
    },
    { said: "--json", takes: "give the day as JSON rather than as tab-separated rows" },
  ],
  helpNotes: [
    "the focus comes from the active schedule's day for the weekday the date falls on.",
    "a day with no schedule day standing is answered with an empty focus rather than refused.",
    "the session answered is the newest one started on that date.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The weekday is worked out from the date rather than from the moment of the call.",
    },
    {
      invariantKind: "departure",
      statement: "The focus is read off the active schedule's day for that weekday.",
    },
    {
      invariantKind: "departure",
      statement: "No active schedule standing is an empty focus rather than a refusal.",
    },
    {
      invariantKind: "departure",
      statement: "The session answered is the newest one started on that date.",
    },
    {
      invariantKind: "departure",
      statement: "A session is complete where it carries the moment it was completed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here starts, finishes or changes a session.",
    },
  ],
} as const satisfies Command
