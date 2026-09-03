import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const exerciseRows = {
  id: "01a0685c-7d80-71d9-9b6b-dfe5a1891ec2",
  pageTypeSlug: "module",
  slug: "exercise-rows",
  definition: "the rows a fitness page type stands as in this checkout, and the fields on one row",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The rows are read from the checkout this code runs in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the pages-system-service.",
    },
    {
      invariantKind: "departure",
      statement: "A field is named in humps here and in dashes in the page file.",
    },
    {
      invariantKind: "departure",
      statement: "A field that is no text, no number and no truth reads as absent.",
    },
    {
      invariantKind: "departure",
      statement: "A read that fails gives back what went unread rather than throwing.",
    },
    {
      invariantKind: "gap",
      statement:
        "The store behind the service holds no fitness page type, so a reader that asks it answers 400 for every one of them.",
    },
  ],
} as const satisfies Module
