import type { Module } from "@akasha/code-system/module"

export const markdownPageTypes = {
  id: "01a06895-1ce0-7000-bd51-b0b848430cae",
  pageTypeSlug: "module",
  slug: "markdown-page-types",
  definition: "the page types of the markdown corpus, read from where they are filed",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page type is read from the file its frontmatter stands in.",
    },
    { invariantKind: "departure", statement: "A path git ignores is never scanned as a page." },
  ],
} as const satisfies Module
