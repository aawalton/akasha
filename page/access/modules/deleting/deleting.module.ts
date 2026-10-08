import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deleting = {
  id: "01a05bd6-c52b-7e05-aaba-3dcff1a42826",
  type: "page-type/module",
  slug: "deleting",
  definition: "a page taken away",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A removal takes the page's file rather than raising a flag on that page.",
    },
  ],
  createdAt: "2026-09-01T07:19:56.971Z",
  updatedAt: "2026-09-15T18:35:14.000Z",
} as const satisfies Module
