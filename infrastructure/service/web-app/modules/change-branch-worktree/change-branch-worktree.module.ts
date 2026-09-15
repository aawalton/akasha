import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const changeBranchWorktree = {
  id: "01a069c1-1f43-7000-bf9c-42ecd1235cba",
  type: "page-type/module",
  slug: "change-branch-worktree",
  definition: "where a numbered change branch's worktree is on disk",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A worktree WORKTREE_DIR names is taken over the numbered worktree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A worktree that is not on disk is refused with why.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here makes a worktree.",
    },
  ],
} as const satisfies Module
