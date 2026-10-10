import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesDispatchBankVault = {
  id: "01a06258-b530-79eb-a110-55d5942865b1",
  type: "page-type/module",
  slug: "inventory-rules-dispatch-bank-vault",
  definition: "withdrawing from and depositing into the furniture vault by rule",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A vault withdrawal goes straight to the game rather than onto the paced chain.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A visit sends at most a fixed number of vault withdrawals, and says so on stopping there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every vault move is counted in the addon's shared server action window.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A vault deposit waits where the shared window is full.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A visit sends every vault deposit at once rather than waiting on each to land.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deposit still in the backpack once those settle is sent again one at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How long a visit's vault deposits took is kept in that visit's bank trace.",
    },
  ],
  createdAt: "2026-09-02T13:39:35.856Z",
  updatedAt: "2026-10-10T14:07:56.723Z",
} as const satisfies Module
