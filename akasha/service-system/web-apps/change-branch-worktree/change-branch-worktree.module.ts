import type { Module } from "@akasha/code-system/module"

export const changeBranchWorktree = {
  id: "01a069c1-1f43-7000-bf9c-42ecd1235cba",
  pageTypeSlug: "module",
  slug: "change-branch-worktree",
  definition: "where a numbered change branch's worktree is on disk",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A worktree WORKTREE_DIR names is taken over the numbered one.",
    },
    {
      invariantKind: "departure",
      statement: "A worktree that is not on disk is refused with why.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here makes a worktree.",
    },
  ],
} as const satisfies Module
