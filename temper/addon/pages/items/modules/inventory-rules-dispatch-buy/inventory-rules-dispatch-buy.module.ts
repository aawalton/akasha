import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesDispatchBuy = {
  id: "01a06258-b531-7fee-9693-0454e9110b2d",
  type: "page-type/module",
  slug: "inventory-rules-dispatch-buy",
  definition: "buying at a store what the stocking rules buying their shortfall are short of",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A stocking rule buying its shortfall buys only at a store selling an item it takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a rule holds is counted among the item types of the entries it takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each rule's buy spends from the gold the rules before it left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule stating a max price buys no entry the store asks more for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every buy at one store is confirmed and reported together.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule short of its target that buys nothing says why in chat.",
    },
  ],
  createdAt: "2026-09-02T13:39:35.857Z",
  updatedAt: "2026-09-27T14:37:56.000Z",
} as const satisfies Module
