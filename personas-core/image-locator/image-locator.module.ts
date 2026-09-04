import type { Module } from "../../code-system/modules/module.page-type.ts"

export const imageLocator = {
  id: "01a05b70-a58c-726c-8271-4f467712887a",
  pageTypeSlug: "module",
  slug: "image-locator",
  definition: "a path turned into and back out of a form relative to a named root",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path already absolute is answered unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "A tag naming no root falls back to the first root given.",
    },
  ],
} as const satisfies Module
