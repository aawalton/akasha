import type { Module } from "@akasha/code-system/module"

export const markdownProse = {
  id: "01a06895-1cdc-7000-bb9d-4d0f5a0909c2",
  pageTypeSlug: "module",
  slug: "markdown-prose",
  definition: "the prose of a markdown body, with fences and inline code taken out",
  code: "ts",
} as const satisfies Module
