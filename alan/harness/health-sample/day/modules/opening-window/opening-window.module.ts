import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const openingWindow = {
  id: "01a05bc7-9129-7008-8402-c98c706da8be",
  type: "page-type/module",
  slug: "opening-window",
  definition: "the span from one opening of Alan's day to the next opening of it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "What a day's blocks open is worked out by the opening span module.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The blocks a day held are the entries beside that day's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day's entries are reached through that day's page rather than by a path here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day with no recorded opening refuses as a value rather than raising.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here invents the moment a day opened.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A spanned window refuses only a day that will not parse.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here asks for a page type but the day's own.",
    },
  ],
  createdAt: "2026-09-01T07:03:20.617Z",
  updatedAt: "2026-10-18T13:52:54.670Z",
} as const satisfies Module
