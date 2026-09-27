import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryJunkQueue = {
  id: "01a06258-b52d-7f4b-bdbd-e12809ac7ab9",
  type: "page-type/module",
  slug: "inventory-junk-queue",
  definition: "gating the junk flag so a burst of changes is applied once",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An item already flagged as asked is not flagged again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each junk flag sent is counted in the addon's shared server action window.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A flag the full window holds back is sent once the window has room.",
    },
  ],
} as const satisfies Module
