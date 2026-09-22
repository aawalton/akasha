import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const healthAnswer = {
  id: "01a08e21-9f54-79c6-8ffa-ace8826c7494",
  type: "page-type/module",
  slug: "health-answer",
  definition: "a router app's answer to a health check",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A health check is answered without reading anything the app depends on.",
    },
  ],
} as const satisfies Module
