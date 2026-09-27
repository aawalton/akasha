import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesBuyCore = {
  id: "01a06258-b52e-7528-93cd-2becebd25548",
  type: "page-type/module",
  slug: "inventory-rules-buy-core",
  definition: "how many of an item to buy given the target, the stock and the money in hand",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Of the store entries a rule takes, the one earliest in the rule's item ids wins.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry whose item the rule's item ids leave out ranks after every listed one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tie keeps the entry the store lists first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What is bought never passes the shortfall, the store's limit or the gold carried.",
    },
  ],
} as const satisfies Module
