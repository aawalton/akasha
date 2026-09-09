import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchTransactionCreate = {
  id: "01a06865-ecc3-7529-b7f4-6be99588abe2",
  pageTypeSlug: "module",
  type: "module",
  slug: "monarch-transaction-create",
  definition: "a transaction written into Monarch, and the pair of them a budget transfer is",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A transaction of zero is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A transaction this project creates has the tag saying a machine made that transaction.",
    },
    {
      invariantKind: "departure",
      statement: "A row created and then refused its tag is refused loudly.",
    },
    {
      invariantKind: "departure",
      statement:
        "A transfer is a row out of one category and a row into another category against one account.",
    },
    {
      invariantKind: "departure",
      statement: "A transfer moves a positive amount.",
    },
    {
      invariantKind: "departure",
      statement: "A negative amount is refused rather than reversed.",
    },
    {
      invariantKind: "departure",
      statement: "A transfer from a category to itself is refused.",
    },

    {
      invariantKind: "departure",
      statement: "The balance is updated unless the caller says otherwise.",
    },
  ],
} as const satisfies Module
