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
      statement: "A stock the backpack holds within its target is in no plan.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stock is held against its target in the group `inventory-stock-group` names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each pending action counts toward the venue `inventory-plan-venue` names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each venue's line is spelled here, so every reader of the plan shows the same line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A plan with nothing pending is an empty plan rather than no plan.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each venue carries the items it counts, so a list and its count always agree.",
    },
  ],
  createdAt: "2026-09-02T13:39:35.854Z",
  updatedAt: "2026-10-10T14:23:52.216Z",
} as const satisfies Module
