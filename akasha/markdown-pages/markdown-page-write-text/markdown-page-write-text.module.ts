import type { Module } from "@akasha/code-system/module"

export const markdownPageWriteText = {
  id: "01a0689a-319b-7000-aa9a-722919836753",
  pageTypeSlug: "module",
  slug: "markdown-page-write-text",
  definition: "writing a markdown page's frontmatter and body back out as text",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value that would not read back as written is quoted.",
    },
  ],
} as const satisfies Module
