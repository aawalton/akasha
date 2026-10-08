import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const knowledgeState = {
  id: "01a06226-4903-78dc-9a7c-de38884ab4ee",
  type: "page-type/module",
  slug: "knowledge-state",
  definition: "the two tables holding everything else in the library",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The library hangs its work off the two tables this module has.",
    },
  ],
  createdAt: "2026-09-02T12:44:31.363Z",
  updatedAt: "2026-09-22T13:54:21.000Z",
} as const satisfies Module
