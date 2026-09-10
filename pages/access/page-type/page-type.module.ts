import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const pageType = {
  id: "01a05bd6-c534-796f-8348-a756c14de572",
  pageTypeSlug: "module",
  type: "module",
  slug: "page-type",
  definition: "a page type created, patched and read",
  code: "ts",
} as const satisfies Module
