import type { Command } from "@akasha/command-system/command"

export const exerciseMobilityLog = {
  id: "01a0685c-7d81-7f1d-bd39-e7b882c48dcb",
  pageTypeSlug: "command",
  slug: "exercise-mobility-log",
  definition: "the command writing down one measurement of how far a joint moved",
  code: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    { said: "--metric <metric>", takes: "which measurement was taken" },
    { said: "--value <text>", takes: "the human read of it, which always stands" },
    { said: "--value-file <file>", takes: "a file the human read is taken from" },
    { said: "--num <n>", takes: "the number beside the read, which the trend is worked out from" },
    { said: "--side <side>", takes: "which side was measured, where a reading may have none" },
    {
      said: "--context <when>",
      takes: "whether it was taken warming up, cooling down, or on its own",
    },
    {
      said: "--date <YYYY-MM-DD>",
      takes: "the day the reading was taken, which is today otherwise",
    },
    { said: "--note <text>", takes: "what is worth knowing about the reading" },
    { said: "--note-file <file>", takes: "a file the note is read from" },
    { said: "--json", takes: "answer as JSON rather than as a line meant for a reader" },
  ],
  helpNotes: [
    "a reading is one row, so logging the same metric twice in a day writes over the first.",
    "the human read is what always stands and the number beside it may be left out.",
    "only the readings carrying a number are read as a trend.",
    "a reading naming no side is filed without one.",
    "the day a reading falls on is the ESO day unless `--date` says otherwise.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading is named for its metric and its day and its side.",
    },
    {
      invariantKind: "departure",
      statement: "The human read of a reading always stands.",
    },
    {
      invariantKind: "departure",
      statement: "The day a reading falls on is the ESO day.",
    },
    {
      invariantKind: "absence",
      statement: "A reading names no session it was taken in.",
    },
  ],
} as const satisfies Command
