import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchCandidate = {
  id: "01a06866-06f1-7e0b-a8bd-0233e7915dee",
  type: "page-type/module",
  slug: "monarch-candidate",
  definition: "how code reads a category rule from a command",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A candidate is checked by the same reader a standing rule is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A candidate names a category or a reservation and never both.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing is a candidate unless named a candidate.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pairing window that is not a number of days is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A category is named in words here and resolved to the page that has that category.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a rule page.",
    },
  ],
  createdAt: "2026-09-03T17:51:52.049Z",
  updatedAt: "2026-10-30T15:40:25.661Z",
} as const satisfies Module
