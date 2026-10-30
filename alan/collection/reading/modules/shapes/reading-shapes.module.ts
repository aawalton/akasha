import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const readingShapes = {
  id: "01a0657b-06a7-7ae0-baf9-5cce272d89ba",
  type: "page-type/module",
  slug: "reading-shapes",
  definition: "the shapes of a story and its chapters",
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
  createdAt: "2026-09-03T04:15:56.583Z",
  updatedAt: "2026-10-30T16:32:46.000Z",
} as const satisfies Module
