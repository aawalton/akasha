import type { Module } from "@akasha/code-system/module"

export const markdownFileTree = {
  id: "01a06895-1cd8-7000-8ea4-c61be83f91b1",
  pageTypeSlug: "module",
  slug: "markdown-file-tree",
  definition: "the markdown files of every checkout, opened and globbed as one tree",
  code: "ts",
  invariants: [
    { invariantKind: "departure", statement: "A tree spans every checkout rather than one." },
    {
      invariantKind: "departure",
      statement: "A path that no checkout holds is opened as null rather than as empty text.",
    },
  ],
} as const satisfies Module
