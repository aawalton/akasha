import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorLifecycleDeathWrite = {
  id: "01a06838-5a84-7002-b23a-fa3c1a68a559",
  type: "page-type/module",
  slug: "supervisor-lifecycle-death-write",
  definition: "whether a supervisor writes a stop on its seat when the supervisor ends",
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
  createdAt: "2026-09-03T17:01:58.788Z",
  updatedAt: "2026-10-30T14:51:38.286Z",
} as const satisfies Module
