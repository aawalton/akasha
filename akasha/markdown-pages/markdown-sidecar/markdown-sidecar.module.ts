import type { Module } from "@akasha/code-system/module"

export const markdownSidecar = {
  id: "01a06895-1cf9-7000-b933-05b4e40bbb0e",
  pageTypeSlug: "module",
  slug: "markdown-sidecar",
  definition: "the files standing beside a markdown page that travel with it",
  code: "ts",
  test: "ts",
} as const satisfies Module
