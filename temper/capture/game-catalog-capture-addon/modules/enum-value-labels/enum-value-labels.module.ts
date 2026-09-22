import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const enumValueLabels = {
  id: "01a06127-662d-77a9-a9a1-5fcbf970d172",
  type: "page-type/module",
  slug: "enum-value-labels",
  definition:
    "the display text the game client gives each number of an enumeration, gathered under that number",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The caller names the string prefix its enumeration answers to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number the client gives no text for is left out.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here knows which enumeration the caller handed in.",
    },
  ],
} as const satisfies Module
