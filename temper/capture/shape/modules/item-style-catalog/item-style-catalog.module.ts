import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const itemStyleCatalog = {
  id: "01a0e0f2-697c-7914-9c4d-73ebcefa5651",
  type: "page-type/module",
  slug: "item-style-catalog",
  definition: "the shape the name the game gives each crafting style number is written in",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A style's name is kept under the number the game gives that style.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number the game names nothing for is left out.",
    },
  ],
} as const satisfies Module
