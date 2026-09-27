import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryBrowserCategoryPlacing = {
  id: "01a0e10e-0fe6-7965-9b2f-d1fae82ea3a6",
  type: "page-type/module",
  slug: "inventory-browser-category-placing",
  definition: "the item browser's categories and subfilters, placed in order from their pages",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page naming no category above it is a category, and the rest are subfilters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Categories, and the subfilters under each, go by display order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page stating no title is labelled by its slug.",
    },
  ],
} as const satisfies Module
