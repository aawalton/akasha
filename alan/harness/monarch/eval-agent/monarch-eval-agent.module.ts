import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchEvalAgent = {
  id: "01a06867-fdff-757f-b949-c56622460db1",
  pageTypeSlug: "module",
  slug: "monarch-eval-agent",
  definition: "the categories an agent proposes for a batch of transactions, and what it was asked",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The agent is offered the household's own categories and may name no other.",
    },
    {
      invariantKind: "departure",
      statement: "Uncategorized is not offered, because Uncategorized is no answer.",
    },
    {
      invariantKind: "departure",
      statement: "Every transaction gets a category, and low confidence is how one is declined.",
    },
    {
      invariantKind: "departure",
      statement:
        "The prompt states the household's meaning for each category rather than leaving the agent to guess.",
    },
    {
      invariantKind: "departure",
      statement: "A confidence outside high, medium and low is refused rather than rounded.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reply is read out of its first array, so a model saying something before its JSON is still read.",
    },
    {
      invariantKind: "departure",
      statement: "A reply that holds no array is refused with the words that reply did say.",
    },
    {
      invariantKind: "departure",
      statement: "The batch's cost is reported alongside the categories that batch proposed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes to Monarch or to our copy.",
    },
  ],
} as const satisfies Module
