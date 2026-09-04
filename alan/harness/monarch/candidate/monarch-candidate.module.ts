import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchCandidate = {
  id: "01a06866-06f1-7e0b-a8bd-0233e7915dee",
  pageTypeSlug: "module",
  slug: "monarch-candidate",
  definition:
    "a rule stated on the command line rather than on a page, checked as a page's would be",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A candidate is checked by the same reader a standing rule is, so it cannot be tried in a shape a page could not hold.",
    },
    {
      invariantKind: "departure",
      statement: "A candidate names exactly one outcome: a category, or a reservation.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing is a candidate unless it is named as one.",
    },
    {
      invariantKind: "departure",
      statement: "A pairing window that is not a number of days is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A category is named in words here and resolved to the page that carries it.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a rule page.",
    },
  ],
} as const satisfies Module
