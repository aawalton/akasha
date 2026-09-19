import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchEvalAgent = {
  id: "01a06867-fdff-757f-b949-c56622460db1",
  type: "page-type/module",
  slug: "monarch-eval-agent",
  definition: "the categories an agent proposes for a batch of transactions, and what it was asked",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The agent is offered the household's own categories and may name no further category.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every transaction gets a category.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A category is declined by low confidence.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The prompt states the household's meaning for each category rather than leaving the agent to guess.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A confidence outside high and medium and low is refused rather than rounded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reply is read out of its first array.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reply that has no array is refused with the words that reply did say.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The batch's cost is reported alongside the categories that batch proposed.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes to Monarch or to our copy.",
    },
  ],
} as const satisfies Module
