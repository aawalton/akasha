import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pinnedReading = {
  id: "01a17f21-5af0-770d-bcba-28bb9c09ee45",
  type: "page-type/module",
  slug: "pinned-reading",
  definition: "the bodies a pinned change's test run reads at that change's base commit",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each test the run names is read at the base commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each file those tests import, at any depth, is read at the base commit too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What they import is walked over the commit's own bodies and index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A named test the commit has nowhere is carried as a removal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An imported file the commit has nowhere is left to the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body the change carries already is kept as the change carries it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a file or runs a test.",
    },
  ],
  createdAt: "2026-10-27T20:50:54.831Z",
  updatedAt: "2026-10-27T20:50:54.831Z",
} as const satisfies Module
