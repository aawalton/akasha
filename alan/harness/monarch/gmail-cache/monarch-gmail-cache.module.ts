import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchGmailCache = {
  id: "01a0685f-4ed9-790d-8078-7ac8bc7dde66",
  pageTypeSlug: "module",
  slug: "monarch-gmail-cache",
  definition: "the Amazon mail this harness reads, fetched once and kept on disk",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A message already on disk is never fetched again.",
    },
    {
      invariantKind: "departure",
      statement: "Messages are fetched eight at a time rather than one by one or all at once.",
    },
    {
      invariantKind: "departure",
      statement: "Mail is reached through the `ops` command rather than through Google directly.",
    },
    {
      invariantKind: "departure",
      statement: "A non-zero exit from `ops` is refused carrying what it said.",
    },
    {
      invariantKind: "departure",
      statement:
        "The listing bounds the answer, so a cached message no longer listed is not returned.",
    },
    {
      invariantKind: "stopgap",
      statement: "The cache folder is handed in by the caller rather than settled here.",
    },
  ],
} as const satisfies Module
