import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryPlan = {
  id: "01a06258-b52e-7092-b8df-b96f86d39d15",
  type: "page-type/module",
  slug: "inventory-plan",
  definition:
    "the pending actions grouped by the venue they happen at, and the chat command that prints them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A backpack item is misplaced where a venue would take it elsewhere, or it is junk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A stock is misplaced only past its target, and counts once however many stacks it has.",
    },
  ],
} as const satisfies Module
