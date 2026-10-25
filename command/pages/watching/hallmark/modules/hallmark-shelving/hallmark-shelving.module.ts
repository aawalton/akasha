import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hallmarkShelving = {
  id: "01a17496-2f57-74c0-94ae-d2bd50fd20d7",
  type: "page-type/module",
  slug: "hallmark-shelving",
  definition: "the pages that put every Hallmark title under its series and its category",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The Hallmark shelf has a romance shelf, a mystery shelf and a Christmas shelf.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A title in a series takes the place it aired in among that series.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A new title whose name another title holds is told apart by the year it aired.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page is found again by its TMDB id first and by its title and year after.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name that makes no export name opens with its page type.",
    },
  ],
  createdAt: "2026-10-25T19:42:42.006Z",
  updatedAt: "2026-10-25T19:45:36.263Z",
} as const satisfies Module
