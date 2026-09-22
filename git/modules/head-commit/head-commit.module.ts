import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const headCommit = {
  id: "01a0943c-95cf-7202-81cd-88b1efc7c605",
  type: "page-type/module",
  slug: "head-commit",
  definition: "a checkout's HEAD commit",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The commit at HEAD is read from git rather than carried by a caller.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The commit is answered as the hash naming it.",
    },
  ],
} as const satisfies Module
