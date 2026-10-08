import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const asyncTaskClass = {
  id: "01a0606a-1c58-7ece-b623-19549164bc35",
  type: "page-type/module",
  slug: "async-task-class",
  definition: "a task and the making, resuming, suspending and cancelling of that task",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A task resumed is put on the job list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A task suspended is taken off the job list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A task cancelled keeps a place on the job list while a finally step is set.",
    },
  ],
  createdAt: "2026-09-02T04:39:21.944Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
