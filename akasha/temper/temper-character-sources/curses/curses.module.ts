import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const curses = {
  id: "01a060ea-ac61-790f-9c2c-5f742647198c",
  pageTypeSlug: "module",
  slug: "curses",
  definition: "the curse a character carries, vampire or werewolf or neither",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the character pages rather than by hand.",
    },
    {
      invariantKind: "constraint",
      statement: "A curse's place in this table is the index a build hash carries.",
    },
    {
      invariantKind: "gap",
      statement: "A curse moved to another place breaks every build hash saved.",
    },
  ],
} as const satisfies Module
