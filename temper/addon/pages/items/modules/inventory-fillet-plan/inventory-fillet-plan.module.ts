import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryFilletPlan = {
  id: "01a12633-683c-7f7c-aada-7131e261d6bb",
  type: "page-type/module",
  slug: "inventory-fillet-plan",
  definition: "the fish one fillet message holds",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One message holds no more items and no more fish than the game takes in one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A first stack larger than the fish one message takes is sent alone, as the game does.",
    },
  ],
  createdAt: "2026-10-10T14:24:25.659Z",
  updatedAt: "2026-10-10T14:24:25.659Z",
} as const satisfies Module
