import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const repoRoot = {
  id: "01a06287-7841-7b94-a9bc-853c9c556746",
  type: "module",
  slug: "repo-root",
  definition: "the code checkout a run reads, named by the environment",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A checkout nobody named is refused rather than worked out.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A named directory with no lockfile is no checkout of the code repository.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No root is derived from where this file itself sits.",
    },
  ],
  answersACheckoutRoot: true,
} as const satisfies Module
