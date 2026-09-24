import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const linearStat = {
  id: "01a0c471-ac2e-74b8-a2de-da9cac658a5e",
  type: "page-type/module",
  slug: "linear-stat",
  definition: "a weighted sum over the values a sheet holds, rounded as asked",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A term names a value the sheet holds and how much of that value the term adds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A term naming a value no sheet holds is refused rather than counted as zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value a piece of equipment holds is named as the piece then the value.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here knows which mechanic is summing.",
    },
  ],
} as const satisfies Module
