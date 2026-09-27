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
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller asking often reads that hash off the files git keeps, running no git.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The folder those files sit in is asked of git once for each root, and held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hash those files do not hold loose is answered by git.",
    },
  ],
} as const satisfies Module
