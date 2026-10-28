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
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A holder sells only what its own stock, a capped tier's room and the hand-off leave.",
    },
  ],
  createdAt: "2026-09-02T13:39:35.860Z",
  updatedAt: "2026-10-28T21:27:16.724Z",
} as const satisfies Module
