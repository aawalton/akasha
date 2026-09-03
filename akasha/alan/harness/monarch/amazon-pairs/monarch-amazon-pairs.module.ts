import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchAmazonPairs = {
  id: "01a06866-06f1-75a5-8052-12c391088698",
  pageTypeSlug: "module",
  slug: "monarch-amazon-pairs",
  definition: "the Amazon charges and refunds standing under one order, and where they disagree",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An order is a pair only where it holds both a charge and a refund.",
    },
    {
      invariantKind: "departure",
      statement: "A charge and a refund naming different categories is a divergence.",
    },
    {
      invariantKind: "departure",
      statement: "A pair where no side names a category is undecided.",
    },
    {
      invariantKind: "departure",
      statement: "A category of Uncategorized is no category here, the same as naming none.",
    },
    {
      invariantKind: "departure",
      statement:
        "A fully refunded order nets to zero, so a pair that does not is either missing a transaction or holding one twice.",
    },
    {
      invariantKind: "departure",
      statement:
        "This reports and does not correct, because which category a refund carries is Alan's to settle.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
