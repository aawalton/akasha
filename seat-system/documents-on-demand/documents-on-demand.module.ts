import type { Module } from "@akasha/code-system/module"

export const documentsOnDemand = {
  id: "01a069c3-5534-7d54-b42c-262b5d637cf6",
  pageTypeSlug: "module",
  slug: "documents-on-demand",
  definition: "a document read off the markdown tree once and kept for the next asker",
  code: "ts",
} as const satisfies Module
