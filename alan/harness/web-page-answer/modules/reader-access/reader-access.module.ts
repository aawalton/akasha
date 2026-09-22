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
      statement: "A reader carrying no contributor is read as the reader nobody signed in as.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "A reader reads a page type only where that reader's person holds an access naming it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A session no person holds reads no page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A person's accesses are held for a few seconds, so one roster is one reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An access carrying a narrow lets its holder read and never write.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader naming its person outright is taken as that person.",
    },
  ],
} as const satisfies Module
