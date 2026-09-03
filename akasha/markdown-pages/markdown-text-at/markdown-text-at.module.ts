import type { Module } from "@akasha/code-system/module"

export const markdownTextAt = {
  id: "01a06895-1cfa-7000-89ff-027b2a796d91",
  pageTypeSlug: "module",
  slug: "markdown-text-at",
  definition: "reading a file's text and the frontmatter block it opens with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A file that is not there is read as null rather than as empty text.",
    },
  ],
} as const satisfies Module
