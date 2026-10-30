import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchRuleDates = {
  id: "01a06863-264d-72d3-8755-d1ae86342ec3",
  type: "page-type/module",
  slug: "monarch-rule-dates",
  definition:
    "how code matches a Monarch transaction against the days and months of a category rule",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A floor holds on its own day and a ceiling does not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A month is cut from the day's own text rather than from a parsed date.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An excluded month is weighed before an included month.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A clause naming no month matches every month rather than no month.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A floor at or after its ceiling is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A date that is not YYYY-MM-DD is refused by the rule's name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A month below 1 or above 12 is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule states a month in words and that month is kept as a number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty date clause is no clause rather than a floor of nothing.",
    },
  ],
  createdAt: "2026-09-03T17:48:43.469Z",
  updatedAt: "2026-10-30T15:44:47.264Z",
} as const satisfies Module
