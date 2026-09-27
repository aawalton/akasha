import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventorySetCategories = {
  id: "01a0e090-8908-77c8-8fbc-359bfba964f7",
  type: "page-type/module",
  slug: "inventory-set-categories",
  definition:
    "the category of each set, by the number the game gives the set, as the addon holds it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The table is written from the set pages and the set category pages as the addon compiles.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A set's category is named by the key its category page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is built the first time a category is asked for, and held after.",
    },
  ],
} as const satisfies Module
