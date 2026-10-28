import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRulesCrossChar = {
  id: "01a06258-b52f-788c-b7d1-9a86b1d3e44b",
  type: "page-type/module",
  slug: "inventory-rules-cross-char",
  definition: "the destination prefix that marks an item for another character",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An item used, researched, deconstructed or filled on a named character reaches it by the bank.",
    },
  ],
  createdAt: "2026-09-02T13:39:35.855Z",
  updatedAt: "2026-10-28T18:34:18.082Z",
} as const satisfies Module
