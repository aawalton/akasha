import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hallmarkMatching = {
  id: "01a17496-2f57-7fe0-b43c-f2b44fa4f552",
  type: "page-type/module",
  slug: "hallmark-matching",
  definition: "what TMDB holds of each Hallmark film and series",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A film is matched by the same title first and by a near one after.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A match is taken only from a year within one of the year the film aired.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A second title a film is also known by is matched only exactly.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "TMDB is asked again where it answers that it is busy.",
    },
  ],
  createdAt: "2026-10-25T19:42:42.006Z",
  updatedAt: "2026-10-25T19:42:42.006Z",
} as const satisfies Module
