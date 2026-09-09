import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchRuleDates = {
  id: "01a06863-264d-72d3-8755-d1ae86342ec3",
  pageTypeSlug: "module",
  type: "module",
  slug: "monarch-rule-dates",
  definition:
    "the date and month clauses a rule states, weighed against a transaction and said back in words",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A floor holds on its own day and a ceiling does not.",
    },
    {
      invariantKind: "departure",
      statement: "A month is cut from the day's own text rather than from a parsed date.",
    },
    {
      invariantKind: "departure",
      statement: "An excluded month is weighed before an included month.",
    },
    {
      invariantKind: "departure",
      statement: "A clause naming no month matches every month rather than no month.",
    },
    {
      invariantKind: "departure",
      statement: "A floor at or after its ceiling is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A date that is not YYYY-MM-DD is refused by the rule's name.",
    },
    {
      invariantKind: "departure",
      statement: "A month below 1 or above 12 is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A rule states a month in words and that month is kept as a number.",
    },
    {
      invariantKind: "departure",
      statement: "An empty date clause is no clause rather than a floor of nothing.",
    },
  ],
} as const satisfies Module
