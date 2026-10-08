import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesDispatch = {
  id: "01a06258-b532-7df4-899b-73fff2d89b43",
  type: "page-type/module",
  slug: "inventory-rules-dispatch",
  definition: "what happens when the trading house opens",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Items are listed first, and the shortfall is bought once listing is over.",
    },
  ],
  createdAt: "2026-09-02T13:39:35.858Z",
  updatedAt: "2026-09-27T14:44:32.000Z",
} as const satisfies Module
