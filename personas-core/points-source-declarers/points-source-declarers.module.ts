import type { Module } from "../../code-system/modules/module.page-type.ts"

export const pointsSourceDeclarers = {
  id: "01a05b70-a58d-7513-8c39-624c74cdaf3a",
  pageTypeSlug: "module",
  slug: "points-source-declarers",
  definition: "which personas declare a given external points source",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only a source declared external counts as declared.",
    },
  ],
} as const satisfies Module
