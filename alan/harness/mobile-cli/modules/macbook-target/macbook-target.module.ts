import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const macbookTarget = {
  id: "01a05cee-e560-7367-9a9b-49ae85f1844f",
  type: "page-type/module",
  slug: "macbook-target",
  definition: "the values that code uses to reach Alan's MacBook",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The user, the address and the key path are read from the macbook's host page.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No page or flag states a different macbook.",
    },
  ],
  createdAt: "2026-09-01T12:25:55.296Z",
  updatedAt: "2026-10-30T16:27:19.830Z",
} as const satisfies Module
