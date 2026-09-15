import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatPageHistory = {
  id: "01a06949-b281-73d6-bbcd-230e36f15701",
  type: "page-type/module",
  slug: "seat-page-history",
  definition: "what a seat last said before its page went, read from akasha's history alone",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The values a seat said before are read from akasha's history and from no older store.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An attribute recovered from history is the bare slug after the last slash.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The assignment is also kept whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page type the assignment names is not lost.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The initiative is taken from its own field rather than from the attributes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat is answered only where the id on the page matches the agent asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat with a parent but no person named takes the fleet as its principal.",
    },
  ],
} as const satisfies Module
