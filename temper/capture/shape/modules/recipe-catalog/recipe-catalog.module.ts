import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const recipeCatalog = {
  id: "01a0604d-23a0-7cb1-93da-f155d5f49f5b",
  type: "page-type/module",
  slug: "recipe-catalog",
  definition: "the recipes the game lists, held under recipe lists",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A recipe list has the recipes in that list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A recipe has only its name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A catalog key arrives as text and is coerced to a number.",
    },
  ],
} as const satisfies Module
