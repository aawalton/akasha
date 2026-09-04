import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const wordCount = {
  id: "01a05b71-e544-7a9b-85e4-86828bc0b993",
  pageTypeSlug: "module",
  slug: "word-count",
  definition: "how many whitespace-separated words a piece of text holds",
  code: "ts",
  test: "ts",
} as const satisfies Module
