import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesDispatchBankCurrency = {
  id: "01a06258-b530-7071-8594-c5738a71f54c",
  type: "page-type/module",
  slug: "inventory-rules-dispatch-bank-currency",
  definition: "depositing and withdrawing currencies at the bank by rule",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each currency transfer is one action counted in the shared server action window.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The paced bank chain runs the transfers and gives its moves only the room left.",
    },
  ],
  createdAt: "2026-09-02T13:39:35.856Z",
  updatedAt: "2026-10-28T21:07:20.717Z",
} as const satisfies Module
