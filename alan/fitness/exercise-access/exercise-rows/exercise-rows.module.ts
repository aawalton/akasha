import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const exerciseRows = {
  id: "01a0685c-7d80-71d9-9b6b-dfe5a1891ec2",
  pageTypeSlug: "module",
  slug: "exercise-rows",
  definition: "the rows a fitness page type stands as in this checkout, and the fields on one row",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The rows are read from the index over the checkout this code runs in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the pages-system-service.",
    },
    {
      invariantKind: "departure",
      statement: "A field is named on a row as the page file names it.",
    },
    {
      invariantKind: "departure",
      statement: "A field's value is the value the page file states rather than that value's text.",
    },
    {
      invariantKind: "departure",
      statement: "A field that is no text, no number and no truth reads as absent.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which rows are wanted, in what order and how many is settled here rather than asked of a store.",
    },
    {
      invariantKind: "departure",
      statement: "A read that fails gives back what went unread rather than throwing.",
    },
  ],
} as const satisfies Module
