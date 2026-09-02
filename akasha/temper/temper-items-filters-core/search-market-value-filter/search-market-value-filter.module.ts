import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const searchMarketValueFilter = {
  id: "01a0613a-e0aa-7ec9-8d23-f17ea1e32d8e",
  pageTypeSlug: "module",
  slug: "search-market-value-filter",
  definition:
    "the market value of an item, narrowed by a range from 0 to 1000000 with a comparison operator",
  code: "ts",
  invariants: [
    {
      invariantKind: "gap",
      statement:
        "The server request takes a price range that the market value filter does not set.",
    },
    {
      invariantKind: "departure",
      statement: "The operator defaults to <= where the saved value names no operator.",
    },
  ],
} as const satisfies Module
