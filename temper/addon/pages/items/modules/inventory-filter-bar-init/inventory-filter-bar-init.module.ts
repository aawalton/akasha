import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryFilterBarInit = {
  id: "01a06258-b52c-744f-9dd8-e140f64a5880",
  type: "page-type/module",
  slug: "inventory-filter-bar-init",
  definition: "starting the inventory filter bar and wiring it to the inventory panels",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The keyboard deconstruction list has a filter bar of its own beside that list.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here narrows the gamepad deconstruction list.",
    },
  ],
  createdAt: "2026-09-02T13:39:35.852Z",
  updatedAt: "2026-11-01T20:17:12.958Z",
} as const satisfies Module
