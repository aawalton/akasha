import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchTransactionCreate = {
  id: "01a06865-ecc3-7529-b7f4-6be99588abe2",
  pageTypeSlug: "module",
  slug: "monarch-transaction-create",
  definition: "a transaction written into Monarch, and the pair of them a budget transfer is",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A transaction of zero is refused, because it moves no budget.",
    },
    {
      invariantKind: "departure",
      statement: "A transaction this project creates carries the tag saying a machine made it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A row created and then refused its tag is refused loudly, because the row stands unmarked.",
    },
    {
      invariantKind: "departure",
      statement:
        "A transfer is two rows against one account, one out of a category and one into another.",
    },
    {
      invariantKind: "departure",
      statement:
        "A transfer moves a positive amount, and a negative one is refused rather than reversed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A transfer between one category and itself is refused, because it writes two rows that cancel.",
    },
    {
      invariantKind: "departure",
      statement: "An errors field in a two-hundred answer is a refusal.",
    },
    {
      invariantKind: "departure",
      statement: "The balance is updated unless the caller says otherwise.",
    },
  ],
} as const satisfies Module
