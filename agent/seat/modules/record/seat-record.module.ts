import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatRecord = {
  id: "01a06949-b281-7a28-8dc0-ad7ecff7be76",
  type: "page-type/module",
  slug: "seat-record",
  definition: "how code reads a value stored with a seat's page and how code writes the value",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's value is read from akasha rather than from any other store.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty agent name reads nothing and writes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty value is not written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value is taken away by clearing its key rather than by writing it empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write finds the seat's name first and does nothing where that name is missing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A failure while writing returns quietly instead of reaching the agent's screen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A backfill writes only where the key has nothing yet.",
    },
  ],
} as const satisfies Module
