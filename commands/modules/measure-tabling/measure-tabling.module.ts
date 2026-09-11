import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const measureTabling = {
  id: "01a08e19-2530-7bd3-84d0-2994f36d9bda",
  type: "module",
  slug: "measure-tabling",
  definition: "a label, a level and a total written as one table with its columns aligned",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A line says a label before a level and a level before a total.",
    },
    {
      invariantKind: "departure",
      statement: "Each column is written to the width of the widest entry in that column.",
    },
    {
      invariantKind: "departure",
      statement: "A label is written to the left of its column and a number to the right.",
    },
    {
      invariantKind: "departure",
      statement: "A total is floored to two decimal places rather than rounded.",
    },
    {
      invariantKind: "departure",
      statement: "A total is written to two decimal places whatever digits that total has.",
    },
    {
      invariantKind: "departure",
      statement: "A level is written as a whole number with no decimal place.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page or works a total out.",
    },
  ],
} as const satisfies Module
