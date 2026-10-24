import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatFlex = {
  id: "01a06949-b281-72df-a9c3-507005e3dfd2",
  type: "page-type/module",
  slug: "seat-flex",
  definition: "how code reads the last part of the name of a seat",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A flex is read from the seat's name rather than from its page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subagent takes the flex of the seat above that subagent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat that states persons came to exist by being opened.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat that states a principal seat name came to exist by being spawned.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Only a seat shown to have been spawned, or a person's seat in a game, is given a flex.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No seat gives itself a flex.",
    },
  ],
  createdAt: "2026-09-03T22:00:32.641Z",
  updatedAt: "2026-10-24T18:08:14.228Z",
} as const satisfies Module
