import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const macbookTarget = {
  id: "01a05cee-e560-7367-9a9b-49ae85f1844f",
  type: "page-type/module",
  slug: "macbook-target",
  definition: "the one macbook's ssh target: its user, its address and its key path",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The host is the fixed address 100.64.0.2 rather than a resolvable name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The key path is held with its leading tilde unexpanded.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No page or flag states a different macbook.",
    },
  ],
} as const satisfies Module
