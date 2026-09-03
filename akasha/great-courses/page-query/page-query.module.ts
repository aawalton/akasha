import type { Module } from "../../code-system/modules/module.page-type.ts"

export const pageQuery = {
  id: "01a06579-f3d9-7000-b770-d76acf7f6945",
  pageTypeSlug: "module",
  slug: "page-query",
  definition: "a page type's rows read from the store, whole or one page found by its title",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A truncated population is refused rather than answered as the whole one.",
    },
    {
      invariantKind: "departure",
      statement: "An empty string held at a key reads as nothing rather than as an empty answer.",
    },
  ],
} as const satisfies Module
