import type { Module } from "../../code-system/module/module.page-type.ts"

export const databaseJson = {
  id: "01a05c5c-1e3e-78b8-a00f-0e5da205f4c6",
  pageTypeSlug: "module",
  slug: "database-json",
  definition: "what a Postgres json column holds, said as a type",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This module names nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Every shard naming it is reached without closing a circle.",
    },
  ],
} as const satisfies Module
