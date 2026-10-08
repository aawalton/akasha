import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryWritCraftingQueue = {
  id: "01a06258-b536-712e-9550-52d00f78c679",
  type: "page-type/module",
  slug: "inventory-writ-crafting-queue",
  definition: "the queue of craft requests, worked one at a time as each craft completes",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A queue with anything left in it counts as crafting still under way.",
    },
  ],
  createdAt: "2026-09-02T13:39:35.862Z",
  updatedAt: "2026-09-21T17:44:29.000Z",
} as const satisfies Module
