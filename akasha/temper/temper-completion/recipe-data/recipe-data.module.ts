import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const recipeData = {
  id: "01a060c0-4132-7121-b748-a5113359ebd8",
  pageTypeSlug: "module",
  slug: "recipe-data",
  definition: "every crafting recipe the game knows, under the recipe list that holds it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This table is captured from the game rather than written by hand.",
    },
    {
      invariantKind: "constraint",
      statement: "The game's report order sets a recipe's place in this table.",
    },
    {
      invariantKind: "gap",
      statement: "A recipe moved to another place drifts from the index the game holds.",
    },
  ],
} as const satisfies Module
