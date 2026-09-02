import type { Module } from "../../code-system/modules/module.page-type.ts"

export const requireMatchPositional = {
  id: "01a05c94-2c02-7a7a-acb9-cfa5c6a7d695",
  pageTypeSlug: "module",
  slug: "require-match-positional",
  definition: "the groups a pattern takes from text by position, refused where it does not match",
  code: "ts",
} as const satisfies Module
