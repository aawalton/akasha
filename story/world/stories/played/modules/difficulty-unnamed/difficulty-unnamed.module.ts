import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const difficultyUnnamed = {
  id: "01a17eef-b5f1-742c-b40f-9b3ebb76918f",
  type: "page-type/module",
  slug: "difficulty-unnamed",
  definition: "the difficulty level a played story naming none plays at",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The level is the default story-played declares for `difficulty`.",
    },
  ],
  createdAt: "2026-10-27T19:56:41.328Z",
  updatedAt: "2026-10-27T19:56:41.328Z",
} as const satisfies Module
