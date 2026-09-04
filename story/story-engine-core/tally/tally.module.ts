import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const tally = {
  id: "01a05b71-e544-779f-b2b4-b8aafc20306a",
  pageTypeSlug: "module",
  slug: "tally",
  definition:
    "a game's prose measured turn by turn against a catalog of patterns, and totalled over the whole run",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A pattern's rate is counted for every thousand words.",
    },
    {
      invariantKind: "departure",
      statement: "A turn given no catalog is still measured for its length.",
    },
    {
      invariantKind: "departure",
      statement: "Only a word holding a letter or a digit is counted.",
    },
  ],
} as const satisfies Module
