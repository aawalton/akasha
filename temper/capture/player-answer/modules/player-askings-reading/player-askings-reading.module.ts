import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playerAskingsReading = {
  id: "01a0d572-a98c-7d1c-bd02-8d8be3b22511",
  type: "page-type/module",
  slug: "player-askings-reading",
  definition: "the reading taking out of the documentation which functions the capture asks",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A function is asked only where its name opens with Get, Is, Has, Can, Does or Are.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A function the documentation marks private or protected is never asked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A function is asked with the longest run of its first values that is a shape.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A function none of whose values make a shape is asked only if all are optional.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The names under each shape are sorted, so a version bump moves only what changed.",
    },
  ],
} as const satisfies Module
