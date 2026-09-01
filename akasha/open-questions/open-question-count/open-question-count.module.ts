import type { Module } from "@akasha/code-system/module"

export const openQuestionCount = {
  id: "01a05c99-9dab-7206-907c-0614bed7d5d7",
  pageTypeSlug: "module",
  slug: "open-question-count",
  definition: "how many questions are still waiting on an answer",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A count raises rather than answering nought.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the page type nothing answers for.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says which questions they are.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a page.",
    },
    {
      invariantKind: "gap",
      statement: "A question is a page akasha carries.",
    },
  ],
} as const satisfies Module
