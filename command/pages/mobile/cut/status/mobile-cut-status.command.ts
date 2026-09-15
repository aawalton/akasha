import type { Command } from "akasha/command/command.page-type.types.ts"

export const mobileCutStatus = {
  id: "01a0685d-ceae-7003-b691-5ac97b0f647a",
  type: "command",
  slug: "mobile-cut-status",
  definition: "the command saying whether a TestFlight cut is owed or the phones are current",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The state compared is taken from origin/main in both repos.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cut owed is answered as a fact rather than as a refusal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Origin is fetched in both repos before anything is compared.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A last cut with no build-input hash leaves a cut owed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No cut on record leaves a cut owed.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here builds or uploads or files anything.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal names each repo origin was already fetched into.",
    },
  ],
  name: "status",
  arguments: [{ argument: "argument/json" }, { argument: "argument/app" }],
} as const satisfies Command
