import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchEvalAgent = {
  id: "01a06867-fdff-757f-b949-c56622460db1",
  type: "module",
  slug: "monarch-eval-agent",
  definition: "the categories an agent proposes for a batch of transactions, and what it was asked",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The agent is offered the household's own categories and may name no further category.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Uncategorized is not offered.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every transaction gets a category.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A category is declined by low confidence.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The prompt states the household's meaning for each category rather than leaving the agent to guess.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A confidence outside high and medium and low is refused rather than rounded.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reply is read out of its first array.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reply that has no array is refused with the words that reply did say.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The batch's cost is reported alongside the categories that batch proposed.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes to Monarch or to our copy.",
    },
  ],
} as const satisfies Module
