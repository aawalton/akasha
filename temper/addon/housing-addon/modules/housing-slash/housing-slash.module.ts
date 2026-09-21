import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingSlash = {
  id: "01a06128-d5d3-74a2-81ea-747b3975df38",
  type: "page-type/module",
  slug: "housing-slash",
  definition: "what each word after the housing slash command does",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A slash command naming no word opens the window.",
    },
  ],
} as const satisfies Module
