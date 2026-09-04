import type { Module } from "@akasha/code-system/module"

export const pageQueryTimes = {
  id: "01a05b92-a9c7-70aa-8322-24d56a21550f",
  pageTypeSlug: "module",
  slug: "page-query-times",
  definition: "the named moments a page query can resolve to an actual time",
  code: "ts",
  invariants: [
    { invariantKind: "departure", statement: "Now is the moment the query is answered." },
    {
      invariantKind: "departure",
      statement: "An eso day is counted from six in the morning, New York.",
    },
    {
      invariantKind: "departure",
      statement: "The next eso day is the one after the eso day the query is answered in.",
    },
    {
      invariantKind: "departure",
      statement: "A wake day is counted from the moment Alan wakes.",
    },
  ],
} as const satisfies Module
