import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const syncOutcome = {
  id: "01a06580-196a-7000-9451-e53d200e3e2d",
  type: "page-type/module",
  slug: "sync-outcome",
  definition: "an error named by kind, retried where retrying helps, and a run's tally",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An error is named by kind from the words its own message has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A network error and a rate limit are the two kinds retried.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The wait before a retry doubles up to a ceiling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Tallies add together.",
    },
  ],
  createdAt: "2026-09-03T04:21:29.066Z",
  updatedAt: "2026-09-22T13:44:11.000Z",
} as const satisfies Module
