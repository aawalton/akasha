import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const craftingSlotItems = {
  id: "01a0e47b-71ea-7da1-8b2b-61ccd411a4e5",
  type: "page-type/module",
  slug: "crafting-slot-items",
  definition: "the item each bag slot last held, as the crafting add-on saw it",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A slot's item is kept by bag and slot as well as on the game's slot data.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A link stamped on the game's slot data is read before the item kept by slot.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A removed slot whose item is known nowhere is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slot that takes another item in place is stamped again with that item.",
    },
  ],
  code: "ts",
  test: "ts",
  createdAt: "2026-09-27T20:08:10.474Z",
  updatedAt: "2026-09-27T20:10:47.000Z",
} as const satisfies Module
