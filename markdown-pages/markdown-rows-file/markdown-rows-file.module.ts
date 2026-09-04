import type { Module } from "@akasha/code-system/module"

export const markdownRowsFile = {
  id: "01a06895-1cf5-7000-9dee-256c1061791d",
  pageTypeSlug: "module",
  slug: "markdown-rows-file",
  definition: "the file the rows of one markdown property stand in, beside the page naming them",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Where `besideAt` will name the file, that name is used rather than a second rule.",
    },
  ],
} as const satisfies Module
