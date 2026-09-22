import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnFiling = {
  id: "01a0c683-b1a8-7ca2-8eb2-e6c47a693845",
  type: "page-type/module",
  slug: "turn-filing",
  definition: "the pages an old engine's state becomes, one for each turn its log names",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every turn a state's log names becomes a page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The turn a state is at becomes a page whether its log names that turn or not.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No beat carrying prose becomes anything, because the story already holds it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The last state row wins, because the rows before it are that state earlier.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Only the turn a state is at carries the pools, the numbers and the rungs the state held.",
    },
  ],
} as const satisfies Module
