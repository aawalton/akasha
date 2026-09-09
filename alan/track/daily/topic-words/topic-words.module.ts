import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const topicWords = {
  id: "01a06972-bd40-7000-9a84-aea39ed039e2",
  pageTypeSlug: "module",
  type: "module",
  slug: "topic-words",
  definition: "the wisdom words Alan wrote and the learn-everything topics he updated on one day",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run of this file counts today's writing onto today's day.",
    },
    {
      invariantKind: "departure",
      statement: "Today is the day Alan's sleep opened rather than the ESO day this moment is in.",
    },
    {
      invariantKind: "departure",
      statement:
        "A day's window opens when Alan's sleep opened it and closes when the next day did.",
    },
    {
      invariantKind: "departure",
      statement: "A day whose window refuses raises rather than counting over a span made up here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here counts a day over the six-in-the-morning ESO boundary.",
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
      statement: "A changed file counts as the topic that file sits under.",
    },
    {
      invariantKind: "departure",
      statement: "A topic is counted once on a day.",
    },
    {
      invariantKind: "departure",
      statement: "A topic a commit only moved is counted as no topic updated.",
    },
    {
      invariantKind: "departure",
      statement: "Both counts patch the one day page.",
    },
    {
      invariantKind: "departure",
      statement: "The wisdom words land before the intelligence topics.",
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
      statement: "A count matching the count the day has lands no commit.",
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
