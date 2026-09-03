import type { Module } from "@akasha/code-system/module"

export const markdownPageRowsHome = {
  id: "01a068a4-60f0-7003-89ab-ec1e7db223b5",
  pageTypeSlug: "module",
  slug: "markdown-page-rows-home",
  definition: "where the rows of a page type live, read off the property pages that declare them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A property page declares a rows home only where it states pages of jsonl rows and names a target.",
    },
    {
      invariantKind: "departure",
      statement:
        "A rows home that states no key is keyed by the stem of the page file declaring it.",
    },
    {
      invariantKind: "departure",
      statement: "A page type with no rows home declared has no rows homes rather than none found.",
    },
    {
      invariantKind: "departure",
      statement: "The homes of a tree are walked once and held against the tree.",
    },
    {
      invariantKind: "departure",
      statement: "A walk is answered from the cache only while the tree's shape mark stands.",
    },
  ],
} as const satisfies Module
