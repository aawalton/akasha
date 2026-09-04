import type { Module } from "@akasha/code-system/module"

export const shaPinnedTree = {
  id: "01a068e0-6ae2-794c-b099-8530373e99dc",
  pageTypeSlug: "module",
  slug: "sha-pinned-tree",
  definition: "a worktree of one repository fixed at one commit, made once and shared",
  code: "ts",
} as const satisfies Module
