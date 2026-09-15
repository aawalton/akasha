import type { Command } from "akasha/command/command.page-type.types.ts"

export const modelAccountReEnable = {
  id: "01a06861-b463-71ad-922e-5b006cdebd6f",
  type: "command",
  slug: "model-account-re-enable",
  definition:
    "the command putting one model account back in the pool its subscription shut it out of",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The picker counts the account again from the next ask.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One call names one account.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An account no page is filed for is refused rather than made.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An account with no reason is answered as already standing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The reason is cleared beside the page rather than in it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every answer here is built by a function rather than written out as a value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An account no page is filed for is a fault of the data.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a token or asks a model.",
    },
  ],
  name: "re-enable",
  arguments: [{ argument: "argument/account", required: true, saidAs: "word" }],
} as const satisfies Command
