import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dataEncodeDecoder = {
  id: "01a06061-969f-7339-89aa-da319bf80d6b",
  type: "page-type/module",
  slug: "data-encode-decoder",
  definition: "encoded lines read back into their original Lua value",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The lines are read as one run of characters across the line breaks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control character says which reader takes the characters following.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A dictionary header is read before anything else where a header is there.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A global dictionary shorter than the header asks for raises an error.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The decoder answers the value and the dictionary the value was read with.",
    },
  ],
} as const satisfies Module
