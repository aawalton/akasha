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
      statement: "Trait text and set bonuses are recorded wherever the slot's own link has them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A use ability is recorded only where it differs from the bare item id's.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A use ability the bare item id reads the same is not recorded.",
    },
  ],
  createdAt: "2026-09-27T06:13:12.641Z",
  updatedAt: "2026-10-20T15:15:48.578Z",
} as const satisfies Module
