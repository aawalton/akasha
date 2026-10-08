import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const operatorClassification = {
  id: "01a0680f-d1b7-79ab-913f-0358ec466fac",
  type: "page-type/module",
  slug: "operator-classification",
  definition: "the class a TypeScript token counts as",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A token is an operator or an operand or uncounted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Trivia and the end of a file are counted as neither an operator nor an operand.",
    },
  ],
  createdAt: "2026-09-03T16:17:42.327Z",
  updatedAt: "2026-09-15T18:34:44.000Z",
} as const satisfies Module
