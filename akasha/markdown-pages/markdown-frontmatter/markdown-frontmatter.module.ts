import type { Module } from "@akasha/code-system/module"

export const markdownFrontmatter = {
  id: "01a06895-1cd9-7000-98e6-b720ac11ee46",
  pageTypeSlug: "module",
  slug: "markdown-frontmatter",
  definition: "a markdown page's frontmatter read as plain fields",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A body that opens with no `---` block declares nothing.",
    },
  ],
} as const satisfies Module
