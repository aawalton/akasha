import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const contributionPointSpending = {
  id: "01a0c4f6-195d-742a-9f09-e9e8c92f3c42",
  type: "page-type/module",
  slug: "contribution-point-spending",
  definition:
    "what moves when a contributor opens a feature request or boosts one, and when one settles",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Points reach a published request and no request at another standing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Points committed are a whole number above nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A contributor commits no more points than that contributor holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Opening a request costs a hundred points, which boost the request it opened.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A denial gives back every boost but the hundred the proposer paid to open it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Completing a request moves no points, the points behind it being spent already.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A balance answered here is the balance held less the points the move spends.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a page or writes one, the caller handing in what it holds.",
    },
  ],
} as const satisfies Module
