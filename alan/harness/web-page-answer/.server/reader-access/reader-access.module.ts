import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const readerAccess = {
  id: "01a0c503-1fee-74f8-8460-00ac5c1b90d6",
  type: "page-type/module",
  slug: "reader-access",
  definition: "whether the reader a site read may read a page type",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader carrying a contributor is read to the person naming that contributor.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader carrying no contributor is the reader nobody signed in as.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "A signed-in reader reads every page type until every person holds the accesses that person needs.",
    },
  ],
} as const satisfies Module
