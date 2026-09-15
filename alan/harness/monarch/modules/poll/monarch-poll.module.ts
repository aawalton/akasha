import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchPoll = {
  id: "01a06868-1536-7a16-9123-ffbef5c8c5b5",
  type: "page-type/module",
  slug: "monarch-poll",
  definition: "the Monarch rows whose update time has moved, landed a minute at a time",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The update stamp of every row in the trusted window is asked for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each stamp is compared against the watermark this copy has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A minute where nothing changed costs one call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only the rows that moved are refetched.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Rows are refetched in batches rather than every row at once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row naming an account this copy has not landed is left alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A row naming an unknown category keeps the category that row has until the daily full run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tag no tag page has is left off rather than landed unnamed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row Monarch no longer lists inside the window fetched is retired.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rules are run only where something landed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row claimed by more than one rule leaves the run non-zero.",
    },
  ],
} as const satisfies Module
