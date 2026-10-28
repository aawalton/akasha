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
      statement: "A soul gem to fill is filled from the backpack of the character it names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A soul gem that character fills is withdrawn there at the bank first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A soul gem another character fills is deposited at the bank, and left there.",
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
  ],
  createdAt: "2026-10-10T14:06:10.424Z",
  updatedAt: "2026-10-28T18:34:18.082Z",
} as const satisfies Module
