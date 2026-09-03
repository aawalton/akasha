import type { Module } from "@akasha/code-system/module"

export const markdownDocumentPosition = {
  id: "01a06895-1cce-7000-add8-2d4d34405407",
  pageTypeSlug: "module",
  slug: "markdown-document-position",
  definition: "the line and column every part of a markdown source is read from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A line and a column are counted from one, an offset from zero.",
    },
  ],
} as const satisfies Module
