import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const patch = {
  id: "01a05bd6-c534-767a-b98d-e5ad35f5a86b",
  type: "page-type/module",
  slug: "patch",
  definition: "a page's values changed",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A patch may write the files beside the pages it reaches.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No patch creates a page.",
    },
  ],
  createdAt: "2026-09-01T07:19:56.980Z",
  updatedAt: "2026-09-24T17:02:31.000Z",
} as const satisfies Module
