import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const loreLibraryCatalog = {
  id: "01a0604d-239f-785b-a09c-fcdf56dbb060",
  type: "page-type/module",
  slug: "lore-library-catalog",
  definition: "the books the lore library has, under collections and categories",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A category has collections that have books.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A book has only its name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A catalog key arrives as text and is coerced to a number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each level is checked against a zod schema in this module's test.",
    },
  ],
} as const satisfies Module
