import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryActionPanel = {
  id: "01a06258-b52c-7d14-aa57-055429e5b07b",
  type: "page-type/module",
  slug: "inventory-action-panel",
  definition: "the small panel shown over the inventory with the counts of pending actions",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The panel sits one gap to the left of the inventory window that is open.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The panel moves again whenever one of the inventory windows shows or hides.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The panel is neither dragged nor kept where a drag left it.",
    },
  ],
  createdAt: "2026-09-02T13:39:35.852Z",
  updatedAt: "2026-10-28T15:46:37.002Z",
} as const satisfies Module
