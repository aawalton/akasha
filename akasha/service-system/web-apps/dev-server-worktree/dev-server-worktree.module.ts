import type { Module } from "@akasha/code-system/module"

export const devServerWorktree = {
  id: "01a06583-0030-7007-bd2f-2f51bdbb851c",
  pageTypeSlug: "module",
  slug: "dev-server-worktree",
  definition: "the worktree path a numbered change branch has",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change number with no worktree is refused with why.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here makes a worktree.",
    },
  ],
} as const satisfies Module
