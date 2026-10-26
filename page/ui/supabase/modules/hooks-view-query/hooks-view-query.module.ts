import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hooksViewQuery = {
  id: "01a061df-fe7f-7004-be80-088a1f3b4cda",
  type: "page-type/module",
  slug: "hooks-view-query",
  definition:
    "The rows a view asks for, read from the store and narrowed by the view's own filters.",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A view filtering on a relation's values asks only for the pages naming them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A view narrowing through a relation asks for the pages its narrows let through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A relation holding many values narrows a view as a relation holding one does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A view asks for the pages naming each related page apart, so no answer runs past its ceiling.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A view naming more than a hundred related pages asks for them in one answer.",
    },
  ],
  createdAt: "2026-09-02T11:27:44.767Z",
  updatedAt: "2026-10-26T21:05:50.798Z",
} as const satisfies Module
