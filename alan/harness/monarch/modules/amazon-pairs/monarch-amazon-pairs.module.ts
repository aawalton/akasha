import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchAmazonPairs = {
  id: "01a06866-06f1-75a5-8052-12c391088698",
  type: "page-type/module",
  slug: "monarch-amazon-pairs",
  definition: "the Amazon charges and refunds standing under one order, and where they disagree",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An order is a pair only where that order has both a charge and a refund.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A charge and a refund naming different categories is a divergence.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A pair where no side names a category is undecided.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A category of Uncategorized is no category here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A fully refunded order nets to zero.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A pair that does not net to zero is either missing a transaction or holding a transaction twice.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "This module reports and corrects nothing.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes.",
    },
  ],
} as const satisfies Module
