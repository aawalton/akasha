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
} as const satisfies Module
