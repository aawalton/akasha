import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const tallyCatalog = {
  id: "01a05b71-e544-7ef9-9d6d-553471113234",
  pageTypeSlug: "module",
  slug: "tally-catalog",
  definition:
    "the patterns a game's prose is measured against and the lens its turn boundaries are read through",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Two patterns may not share an id.",
    },
  ],
} as const satisfies Module
