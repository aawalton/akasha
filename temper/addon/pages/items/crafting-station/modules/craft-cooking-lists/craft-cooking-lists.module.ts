import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const craftCookingLists = {
  id: "01a08e69-e336-7e71-b562-58e9c8e75d47",
  type: "page-type/module",
  slug: "craft-cooking-lists",
  definition: "the recipe rows a cooking category or a search puts in the food panel",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row reaches the panel through the shared row builder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A search covers every recipe list rather than the category shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The favourites categories are read off the character.",
    },
  ],
  createdAt: "2026-09-11T03:01:39.254Z",
  updatedAt: "2026-09-22T13:50:05.000Z",
} as const satisfies Module
