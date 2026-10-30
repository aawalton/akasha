import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageTypeRows = {
  id: "01a0d441-f596-777b-8f53-9333dfa98adf",
  type: "page-type/module",
  slug: "page-type-rows",
  definition: "how code reads the page types above each page type from the index",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is an `at` and a `values`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every row is read from the index rather than from a page body.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A row names the checkout that row was read from ahead of the path inside that checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type is answered on one row for each type above that page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type naming no type above it is answered on one row naming none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The rows are drawn from the repository root or from a reading of the index.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No property row is read.",
    },
  ],
  createdAt: "2026-09-24T16:31:27.638Z",
  updatedAt: "2026-10-30T15:33:13.385Z",
} as const satisfies Module
