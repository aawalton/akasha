import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesDispatchBankVault = {
  id: "01a06258-b530-79eb-a110-55d5942865b1",
  type: "page-type/module",
  slug: "inventory-rules-dispatch-bank-vault",
  definition: "withdrawing from and depositing into the furniture vault by rule",
  code: "ts",
  parts: ["module/inventory-vault-deposit-chain"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A vault withdrawal is planned here and handed to the caller to send.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The caller sends vault withdrawals through the shared window's paced run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Vault deposits start once every withdrawal has gone out.",
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
      statement: "Single deposits sent at once each aim at an empty vault slot of their own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A visit sends no more single deposits than the vault has empty slots.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deposit still in the backpack once those settle goes to the deposit chain.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How long a visit's vault deposits took is kept in that visit's bank trace.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A carrier's vault visit takes out the stacks the scanned houses are allotted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Those go after the other withdrawals, smallest first, within the same backpack margin.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stack taken out for a house is bound for that house, so no deposit returns it.",
    },
  ],
  createdAt: "2026-09-02T13:39:35.856Z",
  updatedAt: "2026-10-28T21:42:35.527Z",
} as const satisfies Module
