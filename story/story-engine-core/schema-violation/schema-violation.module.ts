import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const schemaViolation = {
  id: "01a05bc8-6883-7d97-b265-b768554225f6",
  pageTypeSlug: "module",
  slug: "schema-violation",
  definition: "what a body shape refused, said as the field it stood at and the message",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A refusal standing at no field names the root.",
    },
  ],
} as const satisfies Module
