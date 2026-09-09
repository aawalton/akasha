import type { Module } from "@akasha/code/module"

export const operatorClassification = {
  id: "01a0680f-d1b7-79ab-913f-0358ec466fac",
  pageTypeSlug: "module",
  type: "module",
  slug: "operator-classification",
  definition: "the class a TypeScript token counts as",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A token is an operator or an operand or uncounted.",
    },
    {
      invariantKind: "departure",
      statement: "Trivia and the end of a file are counted as neither an operator nor an operand.",
    },
  ],
} as const satisfies Module
