import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skillLineQueries = {
  id: "01a06187-b3a4-7f6e-9755-30b39a3b5cfb",
  pageTypeSlug: "module",
  slug: "skill-line-queries",
  definition: "which skill lines a character may choose, wear into, or lose on a class change",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A class offers the class lines first while no other slot holds a class line.",
    },
    {
      invariantKind: "constraint",
      statement: "Five pieces of one armour weight open that weight's line.",
    },
  ],
} as const satisfies Module
