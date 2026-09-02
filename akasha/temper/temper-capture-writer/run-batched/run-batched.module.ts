import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const runBatched = {
  id: "01a060b5-5ba9-7ee1-a925-9a6bbfd758f4",
  pageTypeSlug: "module",
  slug: "run-batched",
  definition: "a long list of work done a few items at a time so the game keeps its frame rate",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The caller says how many items go in a batch and how long to wait between.",
    },
    {
      invariantKind: "departure",
      statement: "The wait is asked of the game's own later-caller.",
    },
    {
      invariantKind: "departure",
      statement: "The first batch is done before the caller gets control back.",
    },
    {
      invariantKind: "departure",
      statement: "The closing callback runs once the last item is done.",
    },
  ],
} as const satisfies Module
