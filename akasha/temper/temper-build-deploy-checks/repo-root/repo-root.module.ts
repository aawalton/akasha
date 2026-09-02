import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const repoRoot = {
  id: "01a06287-7841-7b94-a9bc-853c9c556746",
  pageTypeSlug: "module",
  slug: "repo-root",
  definition: "the code checkout a run reads, named by the environment",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A checkout nobody named is refused rather than worked out.",
    },
    {
      invariantKind: "constraint",
      statement: "A named directory holding no lockfile is no checkout of the code repository.",
    },
    {
      invariantKind: "absence",
      statement: "No root is derived from where this file itself sits.",
    },
  ],
} as const satisfies Module
