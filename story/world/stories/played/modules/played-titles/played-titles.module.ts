import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playedTitles = {
  id: "01a17ece-91bc-7aff-a6fa-d1f6b0116dbb",
  type: "page-type/module",
  slug: "played-titles",
  definition: "the titles a story played's character holds",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A title held is a page of the held title kind naming the character.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A title held is named by the world's title it names, or by that title's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A title held twice is named once.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a page.",
    },
  ],
  createdAt: "2026-10-27T19:20:29.371Z",
  updatedAt: "2026-10-27T19:20:29.371Z",
} as const satisfies Module
