import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const queryErrorBoundary = {
  id: "01a061ed-653b-73ef-8556-969d798ee2a5",
  type: "page-type/module",
  slug: "query-error-boundary",
  definition: "the boundary showing that a query failed where its content would be",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The boundary is a class.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "React offers no function form of an error boundary.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An error caught is logged to the console.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The boundary shows no error's own text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The screen holding the boundary hands it every word it shows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Trying again clears the error the boundary has.",
    },
  ],
} as const satisfies Module
