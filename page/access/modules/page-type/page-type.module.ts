import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageType = {
  id: "01a05bd6-c534-796f-8348-a756c14de572",
  type: "page-type/module",
  slug: "page-type",
  definition: "a page type read by slug, with every page type under it",
  code: "ts",
} as const satisfies Module
