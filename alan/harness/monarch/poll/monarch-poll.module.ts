import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchPoll = {
  id: "01a06868-1536-7a16-9123-ffbef5c8c5b5",
  pageTypeSlug: "module",
  slug: "monarch-poll",
  definition: "the Monarch rows whose update time has moved, landed a minute at a time",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The update stamp of every row in the trusted window is asked for and compared against the watermark our copy holds, so a minute where nothing changed costs one call.",
    },
    {
      invariantKind: "departure",
      statement: "Only the rows that moved are refetched.",
    },
    {
      invariantKind: "departure",
      statement: "Rows are refetched in batches rather than all at once.",
    },
    {
      invariantKind: "departure",
      statement:
        "A row naming an account this copy has not landed is left alone, because this path fetches no accounts and an unknown one would otherwise fail every run after this one.",
    },
    {
      invariantKind: "departure",
      statement:
        "A row naming an unknown category keeps the category it holds until the daily full run.",
    },
    {
      invariantKind: "departure",
      statement: "A tag no tag page carries is left off rather than landed unnamed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A row Monarch no longer lists is retired, judged against the window that was fetched.",
    },
    {
      invariantKind: "departure",
      statement: "The rules are run only where something landed.",
    },
    {
      invariantKind: "departure",
      statement: "A row claimed by more than one rule leaves the run non-zero.",
    },
  ],
} as const satisfies Module
