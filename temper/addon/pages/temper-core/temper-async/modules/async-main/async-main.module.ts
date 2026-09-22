import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const asyncMain = {
  id: "01a0606a-1c55-7ece-9605-df5b14cabe22",
  type: "page-type/module",
  slug: "async-main",
  definition: "the library parts' loading order",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The task class is loaded before any module adding a method to the task class.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The public name is published last.",
    },
  ],
} as const satisfies Module
