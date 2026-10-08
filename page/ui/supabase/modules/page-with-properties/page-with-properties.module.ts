import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageWithProperties = {
  id: "01a05cac-2a4f-74fa-a0c3-9ea5542cdf79",
  type: "page-type/module",
  slug: "page-with-properties",
  definition: "a page taken as its id beside the properties it has",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The page in a list with a given id is found here rather than by each reader.",
    },
  ],
  createdAt: "2026-09-01T11:13:02.031Z",
  updatedAt: "2026-09-22T13:25:39.000Z",
} as const satisfies Module
