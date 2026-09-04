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
      statement: "Uncategorized is not offered, because it is no answer.",
    },
    {
      invariantKind: "departure",
      statement: "Every transaction gets a category, and low confidence is how one is declined.",
    },
    {
      invariantKind: "departure",
      statement:
        "The prompt says what the household means by its categories rather than leaving them to be guessed at.",
    },
    {
      invariantKind: "departure",
      statement: "A confidence outside high, medium and low is refused rather than rounded.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reply is read out of the first array it holds, so a model that says something before its JSON is still read.",
    },
    {
      invariantKind: "departure",
      statement: "A reply that holds no array is refused with what it did say.",
    },
    {
      invariantKind: "departure",
      statement: "What the batch cost is reported alongside what it proposed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes to Monarch or to our copy.",
    },
  ],
} as const satisfies Module
