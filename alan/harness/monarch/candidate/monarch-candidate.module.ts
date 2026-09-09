import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchCandidate = {
  id: "01a06866-06f1-7e0b-a8bd-0233e7915dee",
  pageTypeSlug: "module",
  type: "module",
  slug: "monarch-candidate",
  definition:
    "a rule stated on the command line rather than on a page, checked as a page's would be",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A candidate is checked by the same reader a standing rule is.",
    },
    {
      invariantKind: "departure",
      statement: "A candidate names a category or a reservation and never both.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing is a candidate unless named a candidate.",
    },
    {
      invariantKind: "departure",
      statement: "A pairing window that is not a number of days is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A category is named in words here and resolved to the page that has that category.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a rule page.",
    },
  ],
} as const satisfies Module
