import type { Module } from "@akasha/code-system/module"

export const queryErrorBoundary = {
  id: "01a061ed-653b-73ef-8556-969d798ee2a5",
  pageTypeSlug: "module",
  slug: "query-error-boundary",
  definition: "the boundary showing a failed query's error where its content would be",
  code: "tsx",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The boundary is a class.",
    },
    {
      invariantKind: "constraint",
      statement: "React offers no function form of an error boundary.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing is logged where an error is caught.",
    },
    {
      invariantKind: "departure",
      statement: "Trying again clears the error the boundary holds.",
    },
  ],
} as const satisfies Module
