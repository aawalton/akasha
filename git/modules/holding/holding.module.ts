import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const holding = {
  id: "01a04df0-eccd-725e-9745-6888f36628bf",
  type: "module",
  slug: "holding",
  definition: "the hold one landing takes over a worktree while it judges, writes and commits",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The hold is one file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Taking the hold is one create that fails if the hold is there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The hold sits under `.git`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The hold names the process that took the hold and the moment that process started.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A hold left by a process that is gone is taken rather than waited on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A hold naming no holder that can be read is taken once the hold has been there too long.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A hold is released however the act inside the hold ends.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A hold is released only by the process whose mark is in the have.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller that never took the hold is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller that never took the hold never has its act run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The longest a caller waits for the hold is named for another caller to read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The words a wait that ran out is known by are worded here rather than by a caller.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A wait that ran out is thrown as a kind of its own rather than as a plain error.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller asking for a refusal is answered a wait that ran out as a refusal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That refusal states the code an operational fault exits with.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An act that failed inside the hold is thrown on rather than answered as a refusal.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "Two landings over one worktree never overlap.",
    },
  ],
} as const satisfies Module
