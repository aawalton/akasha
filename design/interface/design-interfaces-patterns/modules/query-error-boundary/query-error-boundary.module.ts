import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const queryErrorBoundary = {
  id: "01a061ed-653b-73ef-8556-969d798ee2a5",
  type: "module",
  slug: "query-error-boundary",
  definition: "the boundary showing a failed query's error where its content would be",
  code: "tsx",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The boundary is a class.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "React offers no function form of an error boundary.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing is logged where an error is caught.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Trying again clears the error the boundary has.",
    },
  ],
} as const satisfies Module
