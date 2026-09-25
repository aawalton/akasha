import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const readingShapes = {
  id: "01a0657b-06a7-7ae0-baf9-5cce272d89ba",
  type: "page-type/module",
  slug: "reading-shapes",
  definition: "the story, the chapter, the grade and the catalog behind a choice",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The ladder is the values the `grade` property states, in the order stated.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No rung is written out here.",
    },
  ],
} as const satisfies Module
