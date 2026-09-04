import type { Module } from "@akasha/code-system/module"

export const markdownDocumentShape = {
  id: "01a06895-1cd0-7000-9cf2-8141f27b869d",
  pageTypeSlug: "module",
  slug: "markdown-document-shape",
  definition: "the shape a markdown page body is judged against, as parts and value types",
  code: "ts",
  invariants: [
    { invariantKind: "departure", statement: "Nothing here parses or judges anything." },
  ],
} as const satisfies Module
