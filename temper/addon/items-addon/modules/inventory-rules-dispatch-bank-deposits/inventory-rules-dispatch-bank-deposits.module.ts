import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesDispatchBankDeposits = {
  id: "01a06258-b530-7646-901c-b102e187b412",
  type: "page-type/module",
  slug: "inventory-rules-dispatch-bank-deposits",
  definition: "depositing items into the bank by rule, reserving slots as it goes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An item joins a stack of its own in storage where one has room, whatever action sent it there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item storage has no room for leaves the deposits after it alone.",
    },
  ],
} as const satisfies Module
