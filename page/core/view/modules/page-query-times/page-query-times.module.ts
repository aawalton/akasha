import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageQueryTimes = {
  id: "01a05b92-a9c7-70aa-8322-24d56a21550f",
  type: "module",
  slug: "page-query-times",
  definition: "the named moments a page query can resolve to an actual time",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Now is the moment the query is answered.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An eso day is counted from six in the morning New York time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The next eso day is the eso day after the eso day the query is answered in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A day is counted from the moment its first sleep after six the evening before began.",
    },
  ],
} as const satisfies Module
