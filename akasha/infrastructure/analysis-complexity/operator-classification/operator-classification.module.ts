import type { Module } from "@akasha/code-system/module"

export const operatorClassification = {
  id: "01a0680f-d1b7-79ab-913f-0358ec466fac",
  pageTypeSlug: "module",
  slug: "operator-classification",
  definition: "the class a TypeScript token counts as",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A token is an operator, an operand, or counted as neither.",
    },
    {
      invariantKind: "departure",
      statement: "Trivia and the end of a file are counted as neither.",
    },
  ],
} as const satisfies Module
