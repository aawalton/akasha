import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesCoreConfirmDialog = {
  id: "01a06258-b52f-7911-b65b-636ea6e3179f",
  type: "page-type/module",
  slug: "inventory-rules-core-confirm-dialog",
  definition: "the dialog asking the player to confirm an action the settings mark as needing it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether the dialog is on the screen is answered here.",
    },
  ],
} as const satisfies Module
