import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnRefreshing = {
  id: "01a0d4be-ab45-7897-b812-79c13d7b9d9f",
  type: "page-type/module",
  slug: "turn-refreshing",
  definition: "a seat's turn read again each time its transcript grows",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every seat's transcript is watched, whoever is looking at the seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A transcript growing has its seat's turn read again at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn is read again at most once in each tenth of a second.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A transcript growing is a change to its seat's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which transcript each seat has is looked at again every few seconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A transcript newly found has its seat's turn read at once.",
    },
  ],
} as const satisfies Module
