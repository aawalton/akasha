import type { Module } from "@akasha/code-system/module"

export const branchResolutionDecision = {
  id: "01a0685e-023f-7010-b230-e97d7700f9d2",
  pageTypeSlug: "module",
  slug: "branch-resolution-decision",
  definition:
    "whether every workflow a pipeline stalled on has since passed on a later pipeline of the same branch",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A pipeline that stalled on nothing is not answered elsewhere.",
    },
    {
      invariantKind: "departure",
      statement:
        "A witness counts only where it stands on a pipeline later than the one being answered.",
    },
    {
      invariantKind: "departure",
      statement: "A workflow named twice among the failures is answered once.",
    },
    {
      invariantKind: "departure",
      statement:
        "The workflows left unwitnessed are named whether or not the pipeline is answered.",
    },
  ],
} as const satisfies Module
