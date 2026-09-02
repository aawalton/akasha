import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const checkStock = {
  id: "01a06137-f969-797a-9d04-179e4e9701ba",
  pageTypeSlug: "module",
  slug: "check-stock",
  definition:
    "the condition check over how much of a stock group characters and the bank already hold",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The all-stocked threshold defaults to 200 units.",
    },
    {
      invariantKind: "departure",
      statement: "An item outside any computed stock group is treated as a group of one item id.",
    },
    {
      invariantKind: "departure",
      statement: "Stock checks are skipped when the evaluation context sets skipStock.",
    },
    {
      invariantKind: "departure",
      statement:
        "Bank stock is summed across the whole stock group before the target quantity is compared.",
    },
  ],
} as const satisfies Module
