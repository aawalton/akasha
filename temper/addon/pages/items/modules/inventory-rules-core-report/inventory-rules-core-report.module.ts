import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesCoreReport = {
  id: "01a06258-b52f-7572-a586-e26377cd230d",
  type: "page-type/module",
  slug: "inventory-rules-core-report",
  definition: "the chat report of an action taken or pending, at the level the settings allow",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A report counts what its caller names it counting, and items where none is named.",
    },
  ],
  createdAt: "2026-09-02T13:39:35.855Z",
  updatedAt: "2026-10-28T20:48:28.113Z",
} as const satisfies Module
