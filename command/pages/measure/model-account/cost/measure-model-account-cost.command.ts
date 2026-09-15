import type { Command } from "akasha/command/command.page-type.types.ts"

export const measureModelAccountCost = {
  id: "01a0796e-60fd-789e-af7f-3c8104ab8bb3",
  type: "page-type/command",
  slug: "measure-model-account-cost",
  definition: "the command pricing the calls the transcripts on this machine have",
  code: "ts",
  test: "ts",
  parts: ["module/model-account-costing"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The calls priced are the ones this machine's transcripts hold over the last thirty days.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A price is the api's own list price.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call a resumed session or a subagent wrote down again is counted once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A model this holds no price for is named under the total rather than counted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every transcript is read.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A run writes no value the commit has.",
    },
  ],
  name: "cost",
  arguments: [],
} as const satisfies Command
