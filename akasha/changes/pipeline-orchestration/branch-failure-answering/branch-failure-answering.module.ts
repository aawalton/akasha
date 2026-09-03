import type { Module } from "@akasha/code-system/module"

export const branchFailureAnswering = {
  id: "01a0685e-023f-7011-a312-1e73e490e91f",
  pageTypeSlug: "module",
  slug: "branch-failure-answering",
  definition:
    "a failed pipeline a later pipeline of its branch has cured marked answered elsewhere, and its stalled workflows and steps with it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A pipeline is a candidate only where it failed and a later pipeline stands on its branch.",
    },
    {
      invariantKind: "departure",
      statement:
        "A witness is the newest pipeline each workflow name passed on, one per name per branch.",
    },
    {
      invariantKind: "departure",
      statement:
        "Answering a pipeline carries the answer to its stalled workflows and to their stalled steps.",
    },
    {
      invariantKind: "departure",
      statement:
        "A step is answered through its workflow's sequence number rather than through the pipeline's.",
    },
    {
      invariantKind: "departure",
      statement: "A pipeline naming no file to write throws rather than passing silently.",
    },
    {
      invariantKind: "departure",
      statement: "One pipeline that could not be answered is counted and the rest are still tried.",
    },
    {
      invariantKind: "departure",
      statement: "The ceiling is asked before each pipeline rather than only at the start.",
    },
  ],
} as const satisfies Module
