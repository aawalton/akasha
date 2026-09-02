import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const browseListings = {
  id: "01a060a7-02f2-748c-b8d5-e1c65820155b",
  pageTypeSlug: "module",
  slug: "browse-listings",
  definition: "how listings gathered from a guild store are merged and ordered by price",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A listing arriving again replaces the listing of the same uid.",
    },
    {
      invariantKind: "departure",
      statement: "Listings at the same unit price fall in uid order.",
    },
    {
      invariantKind: "departure",
      statement: "A sort answers with a fresh array rather than reordering the one handed in.",
    },
  ],
} as const satisfies Module
