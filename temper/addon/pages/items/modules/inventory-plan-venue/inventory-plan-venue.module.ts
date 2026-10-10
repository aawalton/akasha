import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryPlanVenue = {
  id: "01a12622-b1f8-71af-8b51-6313b1c100b6",
  type: "page-type/module",
  slug: "inventory-plan-venue",
  definition: "the venue a pending action is carried out at, and what is done there",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An item headed for the craft bag is planned at the bank.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item the craft bag refuses is in no plan, since no visit can move it there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The craft bag is asked only about an item headed for the craft bag.",
    },
  ],
  createdAt: "2026-10-10T14:06:10.424Z",
  updatedAt: "2026-10-10T14:06:10.424Z",
} as const satisfies Module
