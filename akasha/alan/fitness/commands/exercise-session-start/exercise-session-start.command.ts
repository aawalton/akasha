import type { Command } from "@akasha/command-system/command"

export const exerciseSessionStart = {
  id: "01a0685d-b7ab-7443-b385-b009c4eeaa40",
  pageTypeSlug: "command",
  slug: "exercise-session-start",
  definition: "the command opening a workout session for one day from the active schedule's day",
  code: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    {
      said: "--date <YYYY-MM-DD>",
      takes: "the day the session is for, the ESO logical day where none is said",
    },
    {
      said: "--force",
      takes: "open the session even where the scheduled focus for the day is rest",
    },
    { said: "--notes <markdown>", takes: "what the session is opened carrying" },
    { said: "--json", takes: "give the session as JSON rather than as tab-separated rows" },
  ],
  helpNotes: [
    "sessions left open on earlier days are closed before this one is opened, and each closing is answered.",
    "the focus comes from the active schedule's day for the weekday the date falls on.",
    "the session's slug is derived from the weekday, the focus and the date.",
    "a slug already taken is followed by the same slug numbered from two.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Sessions abandoned before this day are closed before this one is opened.",
    },
    {
      invariantKind: "departure",
      statement: "A rest day refuses the session unless the call says to open it anyway.",
    },
    {
      invariantKind: "departure",
      statement: "The session's title says the weekday, the focus and the date.",
    },
    {
      invariantKind: "departure",
      statement: "A slug already taken on that day is followed by the same slug numbered from two.",
    },
    {
      invariantKind: "departure",
      statement: "The session carries the moment it was started.",
    },
    {
      invariantKind: "departure",
      statement: "A session opened against a schedule day names that schedule day.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here plans or logs a set.",
    },
  ],
} as const satisfies Command
