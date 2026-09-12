import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const headCommit = {
  id: "01a0943c-95cf-7202-81cd-88b1efc7c605",
  type: "module",
  slug: "head-commit",
  definition: "the commit a checkout's HEAD is at",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The commit at HEAD is read from git rather than carried by a caller.",
    },
    {
      invariantKind: "departure",
      statement: "The commit is answered as the hash naming it.",
    },
  ],
} as const satisfies Module
