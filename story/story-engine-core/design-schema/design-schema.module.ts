import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const designSchema = {
  id: "01a05b71-e543-7d6a-b9e2-7241ddf845a9",
  pageTypeSlug: "module",
  slug: "design-schema",
  definition:
    "what a game master designs ahead of play for a companion, a dungeon floor, or a rule of the world",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A floor whose challenge the player solves deals out its clues on the page.",
    },
    {
      invariantKind: "departure",
      statement: "A companion talent authored without its trigger is unfinished.",
    },
  ],
} as const satisfies Module
