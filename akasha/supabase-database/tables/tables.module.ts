import type { Module } from "../../code-system/module/module.page-type.ts"

export const tables = {
  id: "01a05c5c-1e3e-77cb-910a-b6e40a9d8f40",
  pageTypeSlug: "module",
  slug: "tables",
  definition: "every table the database holds, with the rows read, inserted and updated",
  code: "ts",
} as const satisfies Module
