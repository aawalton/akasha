import type { Module } from "@akasha/code-system/module"

export const markdownPageRowsParts = {
  id: "01a0689a-3197-7000-8b84-519db72abfdd",
  pageTypeSlug: "module",
  slug: "markdown-page-rows-parts",
  definition: "the parts a markdown page's rows file is split across, and appending to the last",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A row is appended to the last part rather than to a part chosen by name.",
    },
  ],
} as const satisfies Module
