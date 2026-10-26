import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const viewNarrowing = {
  id: "01a17a06-cb79-7293-9cef-ba89b5c567d0",
  type: "page-type/module",
  slug: "view-narrowing",
  definition: "a listing narrowed by the narrows a view states",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A listing naming a view is asked with that view's narrows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A view lists one page type, and a listing of another type naming it is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A narrow through a relation is asked as the pages that relation may name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Those pages are found by one question asking their slug, type and the key alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value is read as the kind the key it is tested against holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A narrow this cannot ask exactly is refused rather than widened.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A view narrowing a key the listing already narrows is refused rather than widening.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No moment a narrow names by a word such as now is resolved here.",
    },
  ],
  createdAt: "2026-10-26T21:03:48.089Z",
  updatedAt: "2026-10-26T21:03:48.089Z",
} as const satisfies Module
