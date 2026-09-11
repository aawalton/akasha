import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const catalogInvalidations = {
  id: "01a063ba-94e5-7e75-aef1-fd5d674e72a9",
  pageTypeSlug: "module",
  type: "module",
  slug: "catalog-invalidations",
  definition: "carrying a side file's request to collect named catalogs again into the saved table",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A request no newer than the last request seen changes nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The version applied is written back so the same request is not applied twice.",
    },
  ],
} as const satisfies Module
