import type { Module } from "@akasha/code-system/module"

export const oldGraphGone = {
  id: "01a06950-57ae-7468-b8a8-143da3d72214",
  pageTypeSlug: "module",
  slug: "old-graph-gone",
  definition: "the refusal every call into the old graph answers with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A refusal names the export that was called and the road the caller owes.",
    },
    {
      invariantKind: "departure",
      statement: "A record that is gone throws on reading any key of that record.",
    },
  ],
} as const satisfies Module
