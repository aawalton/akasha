import type { Module } from "@akasha/code-system/module"

export const ciReaperCluster = {
  id: "01a06861-24c9-7013-a7f4-90240cb9c78c",
  pageTypeSlug: "module",
  slug: "ci-reaper-cluster",
  definition: "the cluster the reaper lists, reads and deletes step containers through",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A container the reaper deletes and does not find counts as already gone.",
    },
  ],
} as const satisfies Module
