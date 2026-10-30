import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchShape = {
  id: "01a0685f-4ed8-7f56-8b0b-c5eb38474e06",
  type: "page-type/module",
  slug: "monarch-shape",
  definition: "how code reads the shape of a value",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A value that does not match the shape asked for is refused rather than coerced.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names the path the value sits at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deep reply says where that reply went wrong.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A refusal says the shape wanted and the shape that stood there rather than printing the value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Null and an array are told apart from an object rather than counted as an object.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number that is not finite is no number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An absent value and a null value are the same absence to an optional read.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here knows the fields Monarch's replies hold.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the network or a file.",
    },
  ],
  createdAt: "2026-09-03T17:44:31.704Z",
  updatedAt: "2026-10-30T15:41:28.119Z",
} as const satisfies Module
