import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const devServerWorktree = {
  id: "01a06583-0030-7007-bd2f-2f51bdbb851c",
  type: "page-type/module",
  slug: "dev-server-worktree",
  definition: "the worktree path a numbered change branch has",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A change number with no worktree is refused with why.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here makes a worktree.",
    },
  ],
} as const satisfies Module
