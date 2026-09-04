import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const stateSchema = {
  id: "01a05b71-e544-7bab-8507-5a3ede4ec9a0",
  pageTypeSlug: "module",
  slug: "state-schema",
  definition: "the whole live state of a game at one turn",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "State keeps the keys the schema does not name.",
    },
  ],
} as const satisfies Module
