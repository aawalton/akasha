import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnProse = {
  id: "01a10376-8f87-7dbb-b8a6-82298380e50a",
  type: "page-type/module",
  slug: "turn-prose",
  definition: "what the prose a writer hands in leaves on a turn or chapter",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Prose is kept beside the turn, ending on a newline.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every character the prose names is checked against the story's cast.",
    },
  ],
} as const satisfies Module
