import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsSavedVariables = {
  id: "01a06269-2913-7889-aca3-5164890b158d",
  type: "page-type/module",
  slug: "destinations-saved-variables",
  definition: "the destinations settings saved per account and per character",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A saved choice of pin art is read as the one piece of art each kind has.",
    },
  ],
} as const satisfies Module
