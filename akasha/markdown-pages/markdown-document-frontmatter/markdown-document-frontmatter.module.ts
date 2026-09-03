import type { Module } from "@akasha/code-system/module"

export const markdownDocumentFrontmatter = {
  id: "01a06895-1ccc-7000-b4c5-60711470bcc4",
  pageTypeSlug: "module",
  slug: "markdown-document-frontmatter",
  definition: "reading a markdown page's frontmatter block into keys, values and spans",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every key, value and item carries the span it was read from.",
    },
    {
      invariantKind: "departure",
      statement:
        "A line that is neither a key nor a list item is carried as unreadable rather than dropped.",
    },
  ],
} as const satisfies Module
