import type { Module } from "@akasha/code-system/module"

export const markdownPropertyRegistry = {
  id: "01a06895-1cec-7000-8595-d893a7286d7d",
  pageTypeSlug: "module",
  slug: "markdown-property-registry",
  definition: "every markdown page type in a tree, indexed by where it stands",
  code: "ts",
} as const satisfies Module
