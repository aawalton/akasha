import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchAmazonRefunds = {
  id: "01a06868-1535-7f8d-b4a1-c65d6300210e",
  pageTypeSlug: "module",
  slug: "monarch-amazon-refunds",
  definition: "the Amazon refund notices matched to credits and written on as notes",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A refund note names the item that came back, drawn from the order that bought it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refund whose order does not settle which item came back is reported and not written.",
    },
    {
      invariantKind: "departure",
      statement: "A credit matching two or more refunds is abstained on and never written.",
    },
    {
      invariantKind: "departure",
      statement:
        "The order confirmations are read through the same reader the notes path uses, so one order is read one way.",
    },
    {
      invariantKind: "departure",
      statement:
        "A message carrying fewer than the amount, the order number and the item is counted rather than passed over silently.",
    },
    {
      invariantKind: "departure",
      statement: "The before-picture of every Amazon row is taken before anything is written.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing is written unless writing was asked for.",
    },
  ],
} as const satisfies Module
