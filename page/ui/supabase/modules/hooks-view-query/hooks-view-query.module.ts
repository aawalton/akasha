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
      statement: "A relation holding many values narrows a view as a relation holding one does.",
    },
  ],
} as const satisfies Module
