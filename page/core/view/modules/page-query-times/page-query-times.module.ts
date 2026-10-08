import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageQueryTimes = {
  id: "01a05b92-a9c7-70aa-8322-24d56a21550f",
  type: "page-type/module",
  slug: "page-query-times",
  definition: "the named moments a page query can resolve to an actual time",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Now is the moment the query is answered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An eso day is counted from six in the morning New York time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The next eso day is the eso day after the eso day the query is answered in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A day is counted from the moment its first sleep after six the evening before began.",
    },
  ],
  createdAt: "2026-09-01T06:05:33.511Z",
  updatedAt: "2026-09-15T18:36:37.000Z",
} as const satisfies Module
