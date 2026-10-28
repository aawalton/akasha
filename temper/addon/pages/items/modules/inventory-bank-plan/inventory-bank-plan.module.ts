import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryBankPlan = {
  id: "01a06258-b527-70e5-bb07-c8089c31f94d",
  type: "page-type/module",
  slug: "inventory-bank-plan",
  definition: "a tally of what the bank holds for each character",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each character's count is the stacks the units sent to that character take.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "One item's units for one character take those units over the item's stack size, rounded up.",
    },
  ],
  createdAt: "2026-09-02T13:39:35.847Z",
  updatedAt: "2026-10-28T19:12:31.445Z",
} as const satisfies Module
