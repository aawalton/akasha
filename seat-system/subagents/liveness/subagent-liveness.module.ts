import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const subagentLiveness = {
  id: "01a095c9-cdd5-7d0e-9723-b8cd507adbe8",
  type: "module",
  slug: "subagent-liveness",
  definition: "what a seat's transcript says of whether a subagent is still running",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading answers that a subagent is working, has returned, or was not read.",
    },
    {
      invariantKind: "departure",
      statement: "Not knowing is answered as its own reading rather than as a subagent returned.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent the transcript names as running reads as working.",
    },
    {
      invariantKind: "departure",
      statement: "A transcript read naming the subagent nowhere reads as returned.",
    },
    {
      invariantKind: "departure",
      statement: "A seat stating no transcript reads as unread.",
    },
    {
      invariantKind: "departure",
      statement: "A transcript that will not open reads as unread.",
    },
    {
      invariantKind: "departure",
      statement: "A page whose own agent id will not be read reads as unread.",
    },
    {
      invariantKind: "departure",
      statement: "A reading that ends in an error reads as unread.",
    },
    {
      invariantKind: "departure",
      statement: "The seat whose transcript is read is named by the agent id the page states.",
    },
    {
      invariantKind: "departure",
      statement:
        "A subagent the transcript names below another subagent is named as one at the top is.",
    },
    {
      invariantKind: "departure",
      statement: "The id a subagent runs under is taken from the page where a caller names none.",
    },
    {
      invariantKind: "departure",
      statement: "A reading says which of its steps settled the answer.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page stating no agent id and a seat stating no transcript are told apart by that reason.",
    },
    {
      invariantKind: "departure",
      statement: "A reading that ends in an error carries what was thrown into that reason.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes that reason anywhere.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here takes a page away, writes one, or lands anything.",
    },
  ],
} as const satisfies Module
