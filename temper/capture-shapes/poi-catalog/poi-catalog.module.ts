import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const poiCatalog = {
  id: "01a0604d-239f-7a9e-93f5-6776a2876885",
  pageTypeSlug: "module",
  slug: "poi-catalog",
  definition: "the points of interest a zone holds and what kind each one is",
  code: "ts",
} as const satisfies Module
