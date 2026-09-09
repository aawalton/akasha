import type { Module } from "@akasha/code/module"

export const whereTesting = {
  id: "01a05bdd-d54c-7989-aac7-52cb42d778c4",
  pageTypeSlug: "module",
  type: "module",
  slug: "where-testing",
  definition: "the tests a `where` states run over one value, and how two values order",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A test is run by the name a `where` states.",
    },
    {
      invariantKind: "departure",
      statement: "A name naming no test answers false.",
    },
    {
      invariantKind: "departure",
      statement: "A value with nothing reads as bare.",
    },
    {
      invariantKind: "departure",
      statement: "A list with nothing reads as bare.",
    },
    {
      invariantKind: "departure",
      statement: "An ordering test answers false over a value that reads as bare.",
    },
    {
      invariantKind: "departure",
      statement: "Two values order as numbers where both values are numbers.",
    },
    {
      invariantKind: "departure",
      statement: "Two values order as instants where both values parse as an instant.",
    },
    {
      invariantKind: "departure",
      statement: "Two values order as text otherwise.",
    },
    {
      invariantKind: "departure",
      statement: "A sort weighs text by the locale's order.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the store.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows a query's parts.",
    },
  ],
} as const satisfies Module
