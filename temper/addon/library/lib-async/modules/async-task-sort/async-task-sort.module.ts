import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const asyncTaskSort = {
  id: "01a0606a-1c59-7223-ad74-aecf370c93d5",
  type: "page-type/module",
  slug: "async-task-sort",
  definition: "a quicksort broken into steps a task runs across frames",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A partition runs as its own step.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The smaller side is sorted before the larger side.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A comparison that never settles raises an error.",
    },
  ],
} as const satisfies Module
