import type { Module } from "@akasha/code/module"

export const pageQueryShape = {
  id: "01a06876-e5ea-7000-a25d-769b1225404c",
  pageTypeSlug: "module",
  type: "module",
  slug: "page-query-shape",
  definition: "the shape a page query is stated in and the shape it is answered in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A query names one page type and every test that query has is on that page type.",
    },
    {
      invariantKind: "departure",
      statement: "A query either counts by properties or reduces a property.",
    },
    {
      invariantKind: "departure",
      statement: "The shape allows a query stating both a count by properties and a reduction.",
    },
    {
      invariantKind: "departure",
      statement:
        "An answer has the pages that answer could not read alongside the pages that answer read.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here answers a query.",
    },
    {
      invariantKind: "departure",
      statement: "These types are the shapes a query is said in.",
    },
  ],
} as const satisfies Module
