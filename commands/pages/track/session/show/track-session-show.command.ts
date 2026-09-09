import type { Command } from "../../../../command.page-type.ts"

export const trackSessionShow = {
  id: "01a07979-8035-7a44-ae7e-9077fced1824",
  pageTypeSlug: "command",
  type: "command",
  slug: "track-session-show",
  definition: "the command saying the stretches a day has",
  code: "ts",
  changeKind: "change-mechanical",
  taking: [
    { said: "--day <date>", takes: "which day to act on, written as that day's own date" },
    { said: "--json", takes: "answer as JSON rather than as lines meant for a reader" },
  ],
  helpNotes: [
    "a day is named at --day and nowhere else.",
    "each stretch's id is printed in what this says to a reader, which is where an id to address by comes from.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "`show` says each stretch's own id to a reader.",
    },
    {
      invariantKind: "departure",
      statement: "A day is named at `--day`.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here takes `--date`.",
    },
    {
      invariantKind: "absence",
      statement: "`show` writes nothing.",
    },
  ],
} as const satisfies Command
