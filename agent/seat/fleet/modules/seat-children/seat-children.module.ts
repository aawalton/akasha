import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatChildren = {
  id: "01a06867-7fc9-7003-a718-93571d4377aa",
  type: "page-type/module",
  slug: "seat-children",
  definition: "the seats standing under a seat, and how many of them hold somebody",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's children are the present seats whose principal is that seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat standing under nobody is nobody's child.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat nobody is present in is nobody's child.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The count is of live children.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The count is written to the caller's output when this file is what was run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run naming no seat writes zero rather than reading the roster.",
    },
  ],
} as const satisfies Module
