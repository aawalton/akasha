import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const knowledgeState = {
  id: "01a06226-4903-78dc-9a7c-de38884ab4ee",
  type: "page-type/module",
  slug: "knowledge-state",
  definition: "the two tables the library keeps everything else on",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The library hangs its work off the two tables this module has.",
    },
  ],
} as const satisfies Module
