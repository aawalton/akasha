import type { Module } from "../code-system/module/module.page-type.ts"

export const holding = {
  id: "01a04df0-eccd-725e-9745-6888f36628bf",
  pageTypeSlug: "module",
  slug: "holding",
  definition: "the hold one landing takes over a worktree while it judges, writes and commits",
  code: "ts",
  test: "ts",
  design: [
    {
      invariantKind: "departure",
      statement: "The hold is one file, and taking it is one create that fails if it stands.",
    },
    {
      invariantKind: "departure",
      statement: "The hold stands under `.git`, so no change ever names it.",
    },
    {
      invariantKind: "departure",
      statement: "A hold left by a process that is gone is taken, not waited on.",
    },
    {
      invariantKind: "departure",
      statement: "A hold is released however the act inside it ends.",
    },
    {
      invariantKind: "departure",
      statement: "A caller that never took the hold is refused, and its act never runs.",
    },
  ],
  intent: [
    {
      invariantKind: "gap",
      statement: "Two landings over one worktree never overlap.",
    },
  ],
} as const satisfies Module
