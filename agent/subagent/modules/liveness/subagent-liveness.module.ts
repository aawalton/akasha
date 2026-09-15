import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const subagentLiveness = {
  id: "01a095c9-cdd5-7d0e-9723-b8cd507adbe8",
  type: "module",
  slug: "subagent-liveness",
  definition: "what a seat's transcript says of whether a subagent is still running",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading answers that a subagent is working, has returned, or was not read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Not knowing is answered as its own reading rather than as a subagent returned.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subagent the transcript names as running reads as working.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A transcript recording a result for the subagent reads as returned.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A transcript read naming the subagent nowhere reads as unread.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A subagent a transcript names nowhere may be working rather than returned.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat stating no transcript reads as unread.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A transcript that will not open reads as unread.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page whose own agent id will not be read reads as unread.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading that ends in an error reads as unread.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The seat whose transcript is read is named by the agent id the page states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A subagent the transcript names below another subagent is named as one at the top is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A result recorded below another subagent is read as one at the top is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That holds though whatever recorded the result has itself returned.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The id a subagent runs under is taken from the page where a caller names none.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading says which of its steps settled the answer.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page stating no agent id and a seat stating no transcript are told apart by that reason.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading that ends in an error carries what was thrown into that reason.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reading is asked for by the ids a process carries as well as by a page.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes that reason anywhere.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here takes a page away, writes one, or lands anything.",
    },
  ],
} as const satisfies Module
