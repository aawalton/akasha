import type { Command } from "akasha/commands/command.page-type.types.ts"

export const trackSessionList = {
  id: "01a07979-8035-7a44-ae7e-9077fced1824",
  type: "command",
  slug: "track-session-list",
  definition: "the command saying the stretches a day has",
  code: "ts",
  changeKind: "change-mechanical",
  taking: [
    { said: "--day <date>", takes: "which day to act on, written as that day's own date" },
    { said: "--json", takes: "answer as JSON rather than as lines meant for a reader" },
  ],

  invariants: [
    {
      invariantKind: "departure",
      statement: "`list` says each stretch's own id to a reader.",
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
      statement: "`list` writes nothing.",
    },
  ],
} as const satisfies Command
