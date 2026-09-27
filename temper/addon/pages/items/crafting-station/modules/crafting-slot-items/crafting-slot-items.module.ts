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
  ],
  code: "ts",
  test: "ts",
} as const satisfies Module
