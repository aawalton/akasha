import type { Module } from "@akasha/code-system/module"

export const pageAnswerSweeping = {
  id: "01a06560-1a2b-7c04-9d31-5f8e2a7b6c11",
  pageTypeSlug: "module",
  slug: "page-answer-sweeping",
  definition: "every page answer kept longer than a day taken away",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "How long an answer has been kept is read off the file rather than off the commit.",
    },
    {
      invariantKind: "departure",
      statement:
        "An answer names the state the answer was worked out from rather than when that state was current.",
    },
    {
      invariantKind: "departure",
      statement: "An answer kept longer than a day is taken away.",
    },
    {
      invariantKind: "departure",
      statement: "The whole-tree answers and the resolved page type answers are both swept.",
    },
    {
      invariantKind: "departure",
      statement: "A page type folder left holding nothing is taken away with its answers.",
    },
    {
      invariantKind: "departure",
      statement: "An answer still wanted is written again on the next miss.",
    },
    {
      invariantKind: "departure",
      statement: "A file that will not open or will not go is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A sweep that takes nothing away says nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing in the writing path takes an old answer away.",
    },
  ],
} as const satisfies Module
