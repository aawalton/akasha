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
      statement: "The count is asked of the store rather than held here.",
    },
    {
      invariantKind: "departure",
      statement: "A count that cannot be asked for raises rather than answering nought.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says which questions they are.",
    },
  ],
} as const satisfies Module
