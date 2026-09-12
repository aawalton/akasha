import type { Command } from "akasha/commands/command.page-type.types.ts"

export const mobileCutStatus = {
  id: "01a0685d-ceae-7003-b691-5ac97b0f647a",
  type: "command",
  slug: "mobile-cut-status",
  definition: "the command saying whether a TestFlight cut is owed or the phones are current",
  code: "ts",
  taking: [
    { said: "--app <slug>", takes: "the app to answer about, the default app where none is said" },
    { said: "--json", takes: "give the answer as JSON rather than as tab-separated rows" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The state compared is taken from origin/main in both repos.",
    },
    {
      invariantKind: "departure",
      statement: "A cut owed is answered as a fact rather than as a refusal.",
    },
    {
      invariantKind: "departure",
      statement: "Origin is fetched in both repos before anything is compared.",
    },
    {
      invariantKind: "departure",
      statement: "A last cut with no build-input hash leaves a cut owed.",
    },
    {
      invariantKind: "departure",
      statement: "No cut on record leaves a cut owed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here builds or uploads or files anything.",
    },
  ],
  name: "status",
} as const satisfies Command
