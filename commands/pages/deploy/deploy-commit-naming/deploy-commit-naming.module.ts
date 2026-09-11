import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const deployCommitNaming = {
  id: "01a09183-6693-7551-9148-59aca04e1bcd",
  pageTypeSlug: "module",
  type: "module",
  slug: "deploy-commit-naming",
  definition: "the commit a deploy is made at",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A call naming no commit is made at the commit HEAD is at.",
    },
    {
      invariantKind: "departure",
      statement: "A commit is answered as the hash git resolves the name to.",
    },
    {
      invariantKind: "departure",
      statement: "A name git resolves to no commit is answered as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "What the worktree differs from a commit by is the tracked paths git names.",
    },
    {
      invariantKind: "departure",
      statement: "The blank line git leaves at the end is no path.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the commit, how many paths differ, and the first three of them.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here settles whether a kind of deploy reads the worktree.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here puts anything up.",
    },
  ],
} as const satisfies Module
