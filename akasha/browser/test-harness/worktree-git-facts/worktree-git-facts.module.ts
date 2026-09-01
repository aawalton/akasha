import type { Module } from "@akasha/code-system/module"

export const worktreeGitFacts = {
  id: "01a05ca9-d804-715b-b71e-0b5e142743bc",
  pageTypeSlug: "module",
  slug: "worktree-git-facts",
  definition: "how far this worktree has run ahead of origin/main",
  code: "ts",
} as const satisfies Module
