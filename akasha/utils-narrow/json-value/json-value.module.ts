import type { Module } from "../../code-system/modules/module.page-type.ts"

export const jsonValue = {
  id: "01a05d38-69c2-7d28-9ad0-6afae06f9402",
  pageTypeSlug: "module",
  slug: "json-value",
  definition: "what a JSON value is, said as a type",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This module names nothing.",
    },
  ],
} as const satisfies Module
