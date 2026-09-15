import type { Command } from "akasha/command/command.page-type.types.ts"

export const measureModelAccountCost = {
  id: "01a0796e-60fd-789e-af7f-3c8104ab8bb3",
  type: "command",
  slug: "measure-model-account-cost",
  definition: "the command pricing the calls the transcripts on this machine have",
  code: "ts",
  test: "ts",
  parts: ["module/model-account-costing"],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The calls priced are the ones this machine's transcripts hold over the last thirty days.",
    },
    {
      invariantKind: "departure",
      statement: "A price is the api's own list price.",
    },
    {
      invariantKind: "departure",
      statement: "A call a resumed session or a subagent wrote down again is counted once.",
    },
    {
      invariantKind: "departure",
      statement: "A model this holds no price for is named under the total rather than counted.",
    },
    {
      invariantKind: "departure",
      statement: "Every transcript is read.",
    },
    {
      invariantKind: "absence",
      statement: "A run writes no value the commit has.",
    },
  ],
  name: "cost",
  arguments: [],
} as const satisfies Command
