import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playedRun = {
  id: "01a1837d-ce13-78b6-be0a-325cd4a2022f",
  type: "page-type/module",
  slug: "played-run",
  definition: "the turns and chapters a play screen draws, and its Show Previous control",
  code: "tsx",
  test: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The run is the story's told turns, or its chapters where no turn is told.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter before the run is drawn only once Show Previous asks for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each press of Show Previous draws one more chapter above what is drawn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A chapter shown this way is drawn as the run draws a chapter, its cards in place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reader stays on the line they were reading as a chapter is drawn above it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Show Previous is gone once the story's first chapter is drawn.",
    },
  ],
  createdAt: "2026-10-28T17:10:22.483Z",
  updatedAt: "2026-10-28T17:10:22.483Z",
} as const satisfies Module
