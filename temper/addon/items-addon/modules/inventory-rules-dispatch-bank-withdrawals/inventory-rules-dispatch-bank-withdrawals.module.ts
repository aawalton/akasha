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
  ],
} as const satisfies Module
