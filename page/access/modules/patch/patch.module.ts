import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const patch = {
  id: "01a05bd6-c534-767a-b98d-e5ad35f5a86b",
  type: "page-type/module",
  slug: "patch",
  definition: "a page's values changed",
  code: "ts",
} as const satisfies Module
