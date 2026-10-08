import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryBuildItemFacts = {
  id: "01a06258-b529-71ba-8496-6c343352f8de",
  type: "page-type/module",
  slug: "inventory-build-item-facts",
  definition: "the facts about an item that the rule evaluator judges, read from a slot or a link",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A bound item has a replacement value and no market value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An item read from a link alone has no uncollected fact unless it is no uncollected set piece.",
    },
  ],
  createdAt: "2026-09-02T13:39:35.849Z",
  updatedAt: "2026-10-08T14:33:30.000Z",
} as const satisfies Module
