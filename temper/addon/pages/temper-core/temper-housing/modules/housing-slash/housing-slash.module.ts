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
  createdAt: "2026-09-02T08:07:41.267Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
