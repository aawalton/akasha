import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const syncOutcome = {
  id: "01a06580-196a-7000-9451-e53d200e3e2d",
  type: "page-type/module",
  slug: "sync-outcome",
  definition: "how code handles the errors of a sync",
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
  ],
  createdAt: "2026-09-03T04:21:29.066Z",
  updatedAt: "2026-10-30T15:49:46.677Z",
} as const satisfies Module
