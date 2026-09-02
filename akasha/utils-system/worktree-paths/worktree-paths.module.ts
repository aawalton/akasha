import type { Module } from "../../code-system/modules/module.page-type.ts"

export const worktreePaths = {
  id: "01a05c67-00ae-7c2a-ab17-097fed36ffd6",
  pageTypeSlug: "module",
  slug: "worktree-paths",
  definition: "the path a project's numbered worktree stands at, and the number read back off it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A worktree number is a number no other number may be handed in place of.",
    },
    {
      invariantKind: "departure",
      statement: "A path that is not under the base answers with no number.",
    },
  ],
} as const satisfies Module
