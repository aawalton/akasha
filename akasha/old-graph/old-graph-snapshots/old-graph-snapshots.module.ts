import type { Module } from "@akasha/code-system/module"

export const oldGraphSnapshots = {
  id: "01a06950-57ae-74cc-8959-0a320d99ed21",
  pageTypeSlug: "module",
  slug: "old-graph-snapshots",
  definition: "the old graph built at one commit, and what that build was keyed by",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every build of the old graph throws.",
    },
    {
      invariantKind: "departure",
      statement: "A build is keyed by the commit and by the repos the build read.",
    },
  ],
} as const satisfies Module
