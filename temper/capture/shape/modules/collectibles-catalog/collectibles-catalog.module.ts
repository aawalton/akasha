import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const collectiblesCatalog = {
  id: "01a0604d-239c-77a7-809f-62a84ec5fc79",
  type: "page-type/module",
  slug: "collectibles-catalog",
  definition: "the collectibles the game lists, held under categories and subcategories",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A category has sub categories that have collectibles.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A general sub category is optional on a category.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A catalog key arrives as text and is coerced to a number.",
    },
  ],
} as const satisfies Module
