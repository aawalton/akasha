import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchCandidate = {
  id: "01a06866-06f1-7e0b-a8bd-0233e7915dee",
  type: "module",
  slug: "monarch-candidate",
  definition:
    "a rule stated on the command line rather than on a page, checked as a page's would be",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A candidate is checked by the same reader a standing rule is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A candidate names a category or a reservation and never both.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Nothing is a candidate unless named a candidate.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A pairing window that is not a number of days is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A category is named in words here and resolved to the page that has that category.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes a rule page.",
    },
  ],
} as const satisfies Module
