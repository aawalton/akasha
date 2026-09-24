import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorLifecycleDeathWrite = {
  id: "01a06838-5a84-7002-b23a-fa3c1a68a559",
  type: "page-type/module",
  slug: "supervisor-lifecycle-death-write",
  definition: "whether a supervisor on its way down writes that its seat stopped",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A supervisor going down to re-exec writes no stopped status.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The seat of a supervisor going down to re-exec is not stopping.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other way down writes the stopped status.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes anything.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Only the writing is decided.",
    },
  ],
} as const satisfies Module
