import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryItemOwnLink = {
  id: "01a0e17f-0341-75ea-9113-92bae40d697d",
  type: "page-type/module",
  slug: "inventory-item-own-link",
  definition:
    "the values the game states for a slot's own item link that its bare item id reads wrong",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A value is weighed against the one the bare item id is read with at level 0.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bare item id is read through the link the reference table was read through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A weapon power or armor rating is recorded only where it is above 0.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Trait text, a use ability and set bonuses are recorded only where they differ.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "A value the bare item id reads the same is not recorded, to keep the capture small.",
    },
  ],
} as const satisfies Module
