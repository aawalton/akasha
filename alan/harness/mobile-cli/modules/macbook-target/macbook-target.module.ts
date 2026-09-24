import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const macbookTarget = {
  id: "01a05cee-e560-7367-9a9b-49ae85f1844f",
  type: "page-type/module",
  slug: "macbook-target",
  definition: "the macbook's ssh target: its user, its address and its key path",
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
} as const satisfies Module
