import type { Module } from "@akasha/code-system/module"

export const catalogInvalidations = {
  id: "01a063ba-94e5-7e75-aef1-fd5d674e72a9",
  pageTypeSlug: "module",
  slug: "catalog-invalidations",
  definition: "carrying a side file's request to collect named catalogs again into the saved table",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A request no newer than the last one seen changes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The version applied is written back so the same request is not applied twice.",
    },
  ],
} as const satisfies Module
