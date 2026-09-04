import type { Module } from "@akasha/code-system/module"

export const markdownPageFileValues = {
  id: "01a0689a-3193-7000-a202-7e467607bf27",
  pageTypeSlug: "module",
  slug: "markdown-page-file-values",
  definition: "the values a markdown page states, read from its frontmatter and its body",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A markdown page's values are read from the `---` block its file opens with.",
    },
  ],
} as const satisfies Module
