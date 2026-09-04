import type { Module } from "../../code-system/modules/module.page-type.ts"

export const syncOutcome = {
  id: "01a06580-196a-7000-9451-e53d200e3e2d",
  pageTypeSlug: "module",
  slug: "sync-outcome",
  definition:
    "an error named by kind, retried where retrying helps, and the tally a run answers with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An error is named by kind from the words its own message holds.",
    },
    {
      invariantKind: "departure",
      statement: "A network error and a rate limit are the two kinds retried.",
    },
    {
      invariantKind: "departure",
      statement: "The wait before a retry doubles up to a ceiling.",
    },
    {
      invariantKind: "departure",
      statement: "Tallies add together.",
    },
  ],
} as const satisfies Module
