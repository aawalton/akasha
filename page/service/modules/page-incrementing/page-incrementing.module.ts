import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageIncrementing = {
  id: "01a0d4da-47de-7571-b7c3-df6181a15c89",
  type: "page-type/module",
  slug: "page-incrementing",
  definition: "a number a page holds, added to in one step",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An increment is handed in at a path of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An increment reads the count and writes the count back in one step.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Increments arriving together are each counted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An increment runs alone in the writer, so no write lands while it runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An increment to a value kept outside the commit takes the lock every writer of that file takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An increment to a value kept in the commit lands a commit, as a patch does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page holding no count is counted from zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count that is no number is refused rather than counted from zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Values set with an increment are written in the same step.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The key counted is not also set.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer names the count the increment left.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An increment reaching no page answers no count and writes nothing.",
    },
  ],
} as const satisfies Module
