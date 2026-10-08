import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const asyncTypes = {
  id: "01a0606a-1c59-7292-9a3b-f5ad9a837532",
  type: "page-type/module",
  slug: "async-types",
  definition: "the shapes a task, the task class and the library table take",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A task has a callstack rather than a Lua coroutine.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every method on a task answers the task so calls chain.",
    },
  ],
  createdAt: "2026-09-02T04:39:21.945Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
