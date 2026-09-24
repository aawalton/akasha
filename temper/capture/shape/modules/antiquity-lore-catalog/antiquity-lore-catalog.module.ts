import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const antiquityLoreCatalog = {
  id: "01a0604d-239b-783a-8c52-bac74f8d09b0",
  type: "page-type/module",
  slug: "antiquity-lore-catalog",
  definition: "what the game states about an antiquity lore book and its antiquity set",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A catalog key arrives as text and is coerced to a number.",
    },
  ],
} as const satisfies Module
