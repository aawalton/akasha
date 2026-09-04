import type { Module } from "../../code-system/modules/module.page-type.ts"

export const rootParentQuery = {
  id: "01a06579-f3d9-7006-8368-78fe6c117de7",
  pageTypeSlug: "module",
  slug: "root-parent-query",
  definition:
    "the date the Great Courses collection root last synced, read as a gate and written back",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A read that failed is refused rather than answered as the sync being due.",
    },
    {
      invariantKind: "constraint",
      statement: "Nothing renders a `great-courses-collection` body out of its keys.",
    },
    {
      invariantKind: "stopgap",
      statement: "The date the gate reads never moves.",
    },
  ],
} as const satisfies Module
