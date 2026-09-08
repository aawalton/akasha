import type { Module } from "@akasha/code/module"

export const tailwindSourcesViolations = {
  id: "01a0817c-2bc4-7714-afeb-b5760568b2ca",
  pageTypeSlug: "module",
  slug: "tailwind-sources-violations",
  definition: "the UI dependencies an entry stylesheet's `@source` directives do not reach",
  code: "ts",
} as const satisfies Module
