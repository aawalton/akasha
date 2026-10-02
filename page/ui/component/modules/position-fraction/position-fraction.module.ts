import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const positionFraction = {
  id: "01a05c3b-4fc5-7216-9ef8-0f552ccdcdd3",
  type: "page-type/module",
  slug: "position-fraction",
  definition: "Converts scroll positions to clamped 0-1 fractions and back.",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The prose is set aside while the panels are shown in its place.",
    },
  ],
} as const satisfies Module
