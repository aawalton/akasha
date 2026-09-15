import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchGmailCache = {
  id: "01a0685f-4ed9-790d-8078-7ac8bc7dde66",
  type: "page-type/module",
  slug: "monarch-gmail-cache",
  definition: "the Amazon mail this harness reads, fetched once and kept on disk",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A message already on disk is never fetched again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Messages are fetched eight at a time rather than one by one or every message at once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Mail is reached by calling the message functions rather than by running a command.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A fault at Gmail rises to the caller rather than being caught here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The listing bounds the answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cached message no longer listed is not returned.",
    },
    {
      invariantKind: "invariant-kind/stopgap",
      statement: "The cache folder is handed in by the caller rather than settled here.",
    },
  ],
} as const satisfies Module
