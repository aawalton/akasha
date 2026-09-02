import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const targetScopes = {
  id: "01a060db-b2be-77b7-b112-34349332a376",
  pageTypeSlug: "module",
  slug: "target-scopes",
  definition: "the shapes a skill effect reaches over, single or cone or area or line",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the skill pages rather than by hand.",
    },
  ],
} as const satisfies Module
