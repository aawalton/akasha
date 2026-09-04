import type { Module } from "@akasha/code-system/module"

export const markdownDocumentHoles = {
  id: "01a06895-1ccd-7000-8c0b-a78022fc67dd",
  pageTypeSlug: "module",
  slug: "markdown-document-holes",
  definition: "the holes a template marks and where a document leaves them unfilled",
  code: "ts",
  invariants: [{ invariantKind: "departure", statement: "A hole is a name inside braces." }],
} as const satisfies Module
