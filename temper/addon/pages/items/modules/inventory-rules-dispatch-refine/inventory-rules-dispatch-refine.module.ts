import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesDispatchRefine = {
  id: "01a06258-b532-781e-9570-7a7a6d5dd5df",
  type: "page-type/module",
  slug: "inventory-rules-dispatch-refine",
  definition: "refining raw materials at a crafting station by rule",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether refining is still under way is answered here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Refining the player never confirmed is not under way.",
    },
  ],
  createdAt: "2026-09-02T13:39:35.858Z",
  updatedAt: "2026-09-21T17:44:29.000Z",
} as const satisfies Module
