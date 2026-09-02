import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryRuleActionLabels = {
  id: "01a06100-3bec-73b4-afa8-f71d8f0a648e",
  pageTypeSlug: "module",
  slug: "inventory-rule-action-labels",
  definition:
    "the words shown for an action, and the whole sentence shown for an action with a destination",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every action carries a verb shown to a reader.",
    },
    {
      invariantKind: "departure",
      statement: "An action carrying a destination is shown with the destination named.",
    },
  ],
} as const satisfies Module
