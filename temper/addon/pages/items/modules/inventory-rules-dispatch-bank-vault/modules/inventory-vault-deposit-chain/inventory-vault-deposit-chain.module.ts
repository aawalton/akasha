import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryVaultDepositChain = {
  id: "01a18477-0708-70d3-a397-649523df64d3",
  type: "page-type/module",
  slug: "inventory-vault-deposit-chain",
  definition: "sending furniture vault deposits one at a time, each after the last landed",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The chain takes the deposits a stow-all or a batch of moves left behind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each deposit waits for the last to land, or for its watchdog.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every deposit and every resend is counted in the shared server action window.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deposit or a resend waits where that window is full.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The chain stops when the vault is full, the bank closes or a deposit stalls.",
    },
  ],
  createdAt: "2026-10-28T21:42:35.527Z",
  updatedAt: "2026-10-28T21:42:35.527Z",
} as const satisfies Module
