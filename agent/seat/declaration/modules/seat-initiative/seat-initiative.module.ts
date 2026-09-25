import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatInitiative = {
  id: "01a06949-b281-745b-96f6-05ec9619e469",
  type: "page-type/module",
  slug: "seat-initiative",
  definition: "how code finds the initiative of a seat",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An initiative is found by its slug through the index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug reaches one initiative or no initiative.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat's initiative is the assignment that seat states addressed as an initiative.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An assignment naming another page type is no initiative.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug naming no initiative is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The initiatives akasha knows are named back.",
    },
  ],
} as const satisfies Module
