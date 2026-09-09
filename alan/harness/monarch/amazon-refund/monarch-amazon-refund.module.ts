import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchAmazonRefund = {
  id: "01a06863-ac0c-71ae-9a80-431ca793b133",
  pageTypeSlug: "module",
  type: "module",
  slug: "monarch-amazon-refund",
  definition: "an Amazon refund read out of the refund mail Amazon sends",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A refund names the order that refund is against and the total and the item that refund is for.",
    },
    {
      invariantKind: "departure",
      statement:
        "A mail missing the order number or the total or the returned item is no refund and is passed over.",
    },
    {
      invariantKind: "departure",
      statement:
        "The item is known by the ASIN in the link Amazon writes rather than by its title.",
    },
    {
      invariantKind: "departure",
      statement:
        "A stated reason for return is kept where Amazon wrote a reason and is null where Amazon did not.",
    },
    {
      invariantKind: "departure",
      statement: "The refund's day is the day the mail was sent.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches Amazon or Gmail.",
    },
  ],
} as const satisfies Module
