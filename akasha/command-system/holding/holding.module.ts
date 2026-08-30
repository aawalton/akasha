import type { Module } from "../../code-system/module/module.page-type.ts"

export const holding = {
  id: "01a04df0-eccd-725e-9745-6888f36628bf",
  pageTypeSlug: "module",
  slug: "holding",
  definition: "the hold one landing takes over a worktree while it judges, writes and commits",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The hold is one file.",
    },
    {
      invariantKind: "departure",
      statement: "Taking it is one create that fails if it stands.",
    },
    {
      invariantKind: "departure",
      statement: "The hold stands under `.git`.",
    },
    {
      invariantKind: "departure",
      statement: "The hold names the process that took it and the moment that process started.",
    },
    {
      invariantKind: "departure",
      statement: "A hold left by a process that is gone is taken rather than waited on.",
    },
    {
      invariantKind: "departure",
      statement: "A hold naming no holder that can be read is taken once it has stood too long.",
    },
    {
      invariantKind: "departure",
      statement: "A hold is released however the act inside it ends.",
    },
    {
      invariantKind: "departure",
      statement: "A hold is released only by the process whose mark stands in it.",
    },
    {
      invariantKind: "departure",
      statement: "A caller that never took the hold is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A caller that never took the hold never has its act run.",
    },
    {
      invariantKind: "gap",
      statement: "Two landings over one worktree never overlap.",
    },
  ],
} as const satisfies Module
