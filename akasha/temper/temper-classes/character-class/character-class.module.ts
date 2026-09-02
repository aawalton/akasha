import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const characterClass = {
  id: "01a06076-1b68-7f3a-8237-8beb701e2f8f",
  pageTypeSlug: "module",
  slug: "character-class",
  definition: "every character class the game offers, with its icon and its game id",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A class's place in this table is the index a build hash carries.",
    },
    {
      invariantKind: "gap",
      statement: "A class moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module
