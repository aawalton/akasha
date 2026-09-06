import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const topicWords = {
  id: "01a06972-bd40-7000-9a84-aea39ed039e2",
  pageTypeSlug: "module",
  slug: "topic-words",
  definition:
    "the wisdom and intelligence words Alan wrote on one day, counted from the commits that landed in it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run of this file counts today's words onto today's day.",
    },
    {
      invariantKind: "departure",
      statement: "Every word a commit added is counted.",
    },
    {
      invariantKind: "departure",
      statement: "A word a commit took away is subtracted from no count.",
    },
    {
      invariantKind: "departure",
      statement: "A file that moved is read as the move rather than as the whole file written.",
    },
    {
      invariantKind: "departure",
      statement: "The wisdom words land before the intelligence words.",
    },
    {
      invariantKind: "departure",
      statement: "A count that does not land leaves the other count to land.",
    },
    {
      invariantKind: "departure",
      statement: "A count that does not land is named on the error stream with its reason.",
    },
    {
      invariantKind: "departure",
      statement: "A run that landed neither count exits 1.",
    },
    {
      invariantKind: "departure",
      statement: "A count matching the count the day carries lands no commit.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides when a count is due.",
    },
    {
      invariantKind: "absence",
      statement: "Importing this file counts nothing.",
    },
  ],
} as const satisfies Module
