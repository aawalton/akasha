import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const halstead = {
  id: "01a0680f-d1b7-7408-b0be-aace54b77d97",
  type: "page-type/module",
  slug: "halstead",
  definition: "the measures a function's operator and operand counts work out to",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A nested function's tokens are left out of its parent's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A type annotation's tokens are left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A function with no body measures zero throughout.",
    },
  ],
} as const satisfies Module
