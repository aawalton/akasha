import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playerAskingShapes = {
  id: "01a0d572-a98c-7768-add6-0e774db4bded",
  type: "page-type/module",
  slug: "player-asking-shapes",
  definition: "the values a function is asked with that the capture knows how to list",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape is the names of a function's required values, joined by commas.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A function asked with nothing has the empty shape.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The capture and the reading of the documentation name each shape from here.",
    },
  ],
} as const satisfies Module
