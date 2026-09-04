import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const entitySchema = {
  id: "01a05b71-e543-79e4-8728-cee11630d9ab",
  pageTypeSlug: "module",
  slug: "entity-schema",
  definition: "the sheet a game entity keeps of what it is, what it carries, and what it can do",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A sheet keeps the keys the schema does not name.",
    },
  ],
} as const satisfies Module
