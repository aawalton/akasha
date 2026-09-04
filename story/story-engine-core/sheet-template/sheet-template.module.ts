import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const sheetTemplate = {
  id: "01a05b71-e544-7bb0-8955-8353130f32de",
  pageTypeSlug: "module",
  slug: "sheet-template",
  definition:
    "the standards an entity sheet's entries are held to, and where an entry falls short of them",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A standard whose path the sheet does not hold checks nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An entry missing its required text is not also weighed for length.",
    },
  ],
} as const satisfies Module
