import type { Module } from "../../code-system/modules/module.page-type.ts"

export const sampleIdentity = {
  id: "01a05bc7-9129-7002-ab78-700980114edd",
  pageTypeSlug: "module",
  slug: "sample-identity",
  definition: "what tells one health reading from another",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "What names a reading is its metric with its source and the span the reading covers.",
    },
    {
      invariantKind: "departure",
      statement: "Two instants spelled differently for the same moment match.",
    },
    {
      invariantKind: "departure",
      statement: "An instant that will not parse throws rather than standing as nothing.",
    },
    {
      invariantKind: "absence",
      statement: "The value read is no part of what names a reading.",
    },
  ],
} as const satisfies Module
