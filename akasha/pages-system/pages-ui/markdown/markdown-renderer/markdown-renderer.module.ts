import type { Module } from "@akasha/code-system/module"

export const markdownRenderer = {
  id: "01a06205-4f3b-7001-926c-c56c490d0fc4",
  pageTypeSlug: "module",
  slug: "markdown-renderer",
  definition: "Markdown rendered as elements, with mentions resolved and headings sectioned.",
  code: "tsx",
} as const satisfies Module
