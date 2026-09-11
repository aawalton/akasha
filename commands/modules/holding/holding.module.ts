import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const holding = {
  id: "01a04df0-eccd-725e-9745-6888f36628bf",
  pageTypeSlug: "module",
  type: "module",
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
      statement: "Taking the hold is one create that fails if the hold is there.",
    },
    {
      invariantKind: "departure",
      statement: "The hold sits under `.git`.",
    },
    {
      invariantKind: "departure",
      statement:
        "The hold names the process that took the hold and the moment that process started.",
    },
    {
      invariantKind: "departure",
      statement: "A hold left by a process that is gone is taken rather than waited on.",
    },
    {
      invariantKind: "departure",
      statement:
        "A hold naming no holder that can be read is taken once the hold has been there too long.",
    },
    {
      invariantKind: "departure",
      statement: "A hold is released however the act inside the hold ends.",
    },
    {
      invariantKind: "departure",
      statement: "A hold is released only by the process whose mark is in the have.",
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
      invariantKind: "departure",
      statement: "The longest a caller waits for the hold is named for another caller to read.",
    },
    {
      invariantKind: "departure",
      statement:
        "The words a wait that ran out is known by are worded here rather than by a caller.",
    },
    {
      invariantKind: "departure",
      statement: "A wait that ran out is thrown as a kind of its own rather than as a plain error.",
    },
    {
      invariantKind: "departure",
      statement: "A caller asking for a refusal is answered a wait that ran out as a refusal.",
    },
    {
      invariantKind: "departure",
      statement:
        "An act that failed inside the hold is thrown on rather than answered as a refusal.",
    },
    {
      invariantKind: "gap",
      statement: "Two landings over one worktree never overlap.",
    },
  ],
} as const satisfies Module
