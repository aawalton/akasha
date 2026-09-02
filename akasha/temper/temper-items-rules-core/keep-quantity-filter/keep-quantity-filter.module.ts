import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const keepQuantityFilter = {
  id: "01a06100-3bf1-7a3f-9e81-b21c96e8c7af",
  pageTypeSlug: "module",
  slug: "keep-quantity-filter",
  definition: "the Keep condition a rule may carry, as the rule editor offers it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This filter reads and writes the `keepQuantity` condition alone.",
    },
    {
      invariantKind: "departure",
      statement: "A rule carrying the `target-quantity` condition is offered no Keep condition.",
    },
    {
      invariantKind: "departure",
      statement: "A rule whose action leaves an item in place is offered no Keep condition.",
    },
  ],
} as const satisfies Module
