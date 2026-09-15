import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const generationLog = {
  id: "01a0685d-4b35-7010-9103-1427f940275e",
  type: "module",
  slug: "generation-log",
  definition: "the log a generation is recorded in, and the landing of one row beside it",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row is one json line appended to the jsonl file beside the log's page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which file beside the log a row joins is read from the row's page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A row taking the last part past the byte ceiling opens the next part instead.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A landing is written against the commit it read, so a lost race is tried again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The last part is found by halving the range rather than by reading every part.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A patch rewrites the one part holding the row of that id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A patch reads back from the last part, so a row just landed is found first.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A patch naming an id no row carries is refused rather than landing a new row.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A run's log is read from the environment and is `alan` where the environment says nothing.",
    },
  ],
} as const satisfies Module
