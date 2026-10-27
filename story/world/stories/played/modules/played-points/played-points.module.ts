import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playedPoints = {
  id: "01a17eb9-d0c9-79f9-9a15-699f585055bd",
  type: "page-type/module",
  slug: "played-points",
  definition: "the points a story played's character has left to spend",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A point is a page of a kind extending the generic point kind, found by the store.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A point is labelled by its kind's slug, less the words its character's slug has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A point page adding a word to its character's slug puts that word first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a point page holding more than none is answered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Point pages stating a display order come first, in it, and the rest by label.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A point page is drawn as a point rather than among the resources.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a page.",
    },
  ],
  createdAt: "2026-10-27T18:57:49.256Z",
  updatedAt: "2026-10-27T18:57:49.256Z",
} as const satisfies Module
