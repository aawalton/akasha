import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryStockDepositDecision = {
  id: "01a06258-b534-7658-a6f9-6918c06107d4",
  type: "page-type/module",
  slug: "inventory-stock-deposit-decision",
  definition: "how much of a stock tier to deposit given what is held and what is wanted",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A character keeps the fill quantity and offers the rest of its stock.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A capped tier takes its own quantity and what it hands off to the other characters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a tier already holds counts against its quantity and its hand-off alike.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tier with no quantity takes the whole of what is offered.",
    },
  ],
} as const satisfies Module
