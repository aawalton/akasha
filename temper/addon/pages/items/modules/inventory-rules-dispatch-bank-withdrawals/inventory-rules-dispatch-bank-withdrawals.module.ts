import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesDispatchBankWithdrawals = {
  id: "01a06258-b530-7df4-9831-55755f31aee1",
  type: "page-type/module",
  slug: "inventory-rules-dispatch-bank-withdrawals",
  definition: "withdrawing items from the bank by rule, for this character and for others",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every slot of one storage sweep shares the claims.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A second copy of a claimable item goes to a second character.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stock rule's first-listed items are withdrawn before the ones listed after.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "At the bank or a house chest, only the storage carrier withdraws an item bound for storage.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "At a house chest, only the carrier withdraws, but for an item a rule sends to a character.",
    },
  ],
  createdAt: "2026-09-02T13:39:35.856Z",
  updatedAt: "2026-10-28T19:31:05.753Z",
} as const satisfies Module
