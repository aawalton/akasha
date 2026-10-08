import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const assistantBindings = {
  id: "01a060e7-1bec-71bf-a376-11634f9d6337",
  type: "page-type/module",
  slug: "assistant-bindings",
  definition: "how a keybind name is made for each assistant",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name already carrying text is left alone.",
    },
  ],
  createdAt: "2026-09-02T06:55:53.836Z",
  updatedAt: "2026-09-22T12:51:44.000Z",
} as const satisfies Module
