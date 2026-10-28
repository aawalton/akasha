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
      statement: "A stow-all is one request, whatever number of stacks it moves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stow-all takes every furnishing the vault can take, and no filter narrows it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where the rules keep some back, a stow-all goes and those are taken back after.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That is planned only where taking back costs fewer requests than a move each.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That is planned only where the vault has a free slot for every stack it stows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Otherwise each slot the rules send to the vault is sent a move of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A kept stack is taken back from a vault slot holding its item and enough of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each stack taken back aims at an empty backpack slot of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each move sent together aims at an empty vault slot of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No more moves are sent than the vault has empty slots.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deposit landed where its backpack slot is left empty.",
    },
  ],
  createdAt: "2026-10-10T14:07:56.723Z",
  updatedAt: "2026-10-28T21:46:07.799Z",
} as const satisfies Module
