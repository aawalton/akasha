import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const drawingsFound = {
  id: "01a0a065-7b7d-75b8-95b0-3acd9a5dcade",
  type: "module",
  slug: "drawings-found",
  definition: "the page type a drawing's file names, and the first drawing a chain reaches",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A drawing's file is named for the page it sits beside and the group it is in.",
    },
    {
      invariantKind: "departure",
      statement: "The page type a drawing is for is the part of that name before the first dot.",
    },
  ],
} as const satisfies Module
