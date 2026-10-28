import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryBankActionPanel = {
  id: "01a06258-b527-758b-b9d3-f61c61aec470",
  type: "page-type/module",
  slug: "inventory-bank-action-panel",
  definition: "the small panel shown at the bank with the counts of what is about to move",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The counts shown are tallied by the sweep that opened the bank.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The header and each character's row count stacks and call them stacks.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No verdict this panel shows outlives the sweep that judged it.",
    },
  ],
  createdAt: "2026-09-02T13:39:35.847Z",
  updatedAt: "2026-10-28T19:12:31.445Z",
} as const satisfies Module
