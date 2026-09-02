import type { Module } from "../../code-system/modules/module.page-type.ts"

export const framework = {
  id: "01a05b70-a58c-7dfa-8e79-b79e338c724b",
  pageTypeSlug: "module",
  slug: "framework",
  definition: "a markdown body with its leading frontmatter block taken off",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A body not opening with a fence is answered unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "The blank lines left where the block stood are dropped too.",
    },
  ],
} as const satisfies Module
