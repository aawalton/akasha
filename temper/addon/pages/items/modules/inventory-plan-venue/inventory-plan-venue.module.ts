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
    {
      decisionKind: "decision-kind/departure",
      statement: "A fish to fillet is planned at a crafting station.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A listing the guild store would skip is held, with the reason it would skip it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The plan and the guild store visit skip a listing for the same reasons.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item another character sells or lists is planned as a deposit at the bank.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item a rule takes out of a house chest is planned as a withdrawal there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Such a withdrawal is what the chest visit itself would withdraw, and no more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Only the storage carrier withdraws from a house chest, but for an item a rule sends to a character.",
    },
  ],
  createdAt: "2026-10-10T14:06:10.424Z",
  updatedAt: "2026-10-28T21:11:40.593Z",
} as const satisfies Module
