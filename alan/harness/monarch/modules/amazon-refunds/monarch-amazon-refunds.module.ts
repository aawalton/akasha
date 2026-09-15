import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchAmazonRefunds = {
  id: "01a06868-1535-7f8d-b4a1-c65d6300210e",
  type: "page-type/module",
  slug: "monarch-amazon-refunds",
  definition: "the Amazon refund notices matched to credits and written on as notes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A refund note names the item that came back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The item a refund note names is drawn from the order that bought that item.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A refund whose order does not settle which item came back is reported and not written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A credit matching several refunds is abstained on and never written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The order confirmations are read through the same reader the notes path uses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A message missing the amount or the order number or the item is counted rather than dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The before-picture of every Amazon row is taken before anything is written.",
    },
  ],
} as const satisfies Module
