import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playerAnswerDescriptor = {
  id: "01a0d578-6f2a-7f09-ba83-bb6c91db2342",
  type: "page-type/module",
  slug: "player-answer-descriptor",
  definition: "the version and shape of the catalog of what the game answered about the character",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The answers are a catalog saved under `playerAnswerCatalog`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Answers are kept under the values asked, joined by commas, then the function's name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The values come first, so an item link is written once rather than per function.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A function asked with nothing keeps its answers under the empty key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change to how answers are kept moves the version, so the old are not read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The API version and the time the answers were taken are kept beside them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The width and the height of the game's interface are kept beside them.",
    },
  ],
  createdAt: "2026-09-24T22:10:34.922Z",
  updatedAt: "2026-10-19T18:18:10.663Z",
} as const satisfies Module
