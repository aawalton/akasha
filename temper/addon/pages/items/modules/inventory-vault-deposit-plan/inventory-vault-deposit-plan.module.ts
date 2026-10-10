import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryVaultDepositPlan = {
  id: "01a12624-5133-70be-99cb-feaa825723f7",
  type: "page-type/module",
  slug: "inventory-vault-deposit-plan",
  definition: "which backpack slots a visit to the furniture vault deposits, and how",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A visit deposits only the slots the rules send to the vault and the vault can take.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Where every furnishing the vault can take is sent there, one stow-all moves them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Where the rules keep any such furnishing back, each slot is sent a move of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deposit landed where its backpack slot is left empty.",
    },
  ],
  createdAt: "2026-10-10T14:07:56.723Z",
  updatedAt: "2026-10-10T14:07:56.723Z",
} as const satisfies Module
