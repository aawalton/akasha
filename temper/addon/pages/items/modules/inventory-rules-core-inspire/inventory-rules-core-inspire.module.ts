import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesCoreInspire = {
  id: "01a06258-b52f-71e3-a07e-8a55157ddd17",
  type: "page-type/module",
  slug: "inventory-rules-core-inspire",
  definition:
    "whether deconstructing an item is useful to a character, and which crafting levels say so",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A trait is matched by name without regard to case.",
    },
  ],
  createdAt: "2026-09-02T13:39:35.855Z",
  updatedAt: "2026-09-21T17:37:10.000Z",
} as const satisfies Module
